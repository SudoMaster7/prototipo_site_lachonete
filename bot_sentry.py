import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import urllib.parse
import os

# --- CONFIGURAÇÕES ---
ARQUIVO_ENTRADA = 'Tabela de clientes restaurante e lanchonete.xlsx'
ARQUIVO_SAIDA = 'Tabela_Enriquecida_SUDO.xlsx' # O nome do arquivo novo que ele vai criar
TEMPO_ESPERA = 3  # Segundos para esperar o Google carregar

def localizar_chrome():
    """Tenta localizar binários de navegadores Chromium no Windows."""
    candidatos = [
        os.environ.get("CHROME_PATH"),
        r"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        r"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        os.path.expandvars(r"%LOCALAPPDATA%\\Google\\Chrome\\Application\\chrome.exe"),
        # Brave (compatível com ChromeDriver)
        r"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
        r"C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    ]
    for p in candidatos:
        if p and os.path.exists(p):
            return p
    return None

def configurar_driver():
    """Configura o WebDriver com fallback para Edge se Chrome não estiver disponível."""
    # Tenta Chrome/Chromium primeiro
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")  # Ative se quiser rodar sem GUI
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--ignore-ssl-errors')

    caminho_chrome = localizar_chrome()
    if caminho_chrome:
        chrome_options.binary_location = caminho_chrome

    try:
        # Usar Selenium Manager (não precisa webdriver_manager)
        driver = webdriver.Chrome(options=chrome_options)
        print("🟢 Iniciado com Chrome/Chromium")
        return driver
    except Exception as e:
        print(f"🔻 Falha ao iniciar Chrome: {e}\n   Tentando Microsoft Edge...")

    # Fallback para Edge (quase sempre presente no Windows)
    try:
        from selenium.webdriver.edge.options import Options as EdgeOptions
        edge_options = EdgeOptions()
        # edge_options.add_argument("--headless")
        edge_options.add_argument("--start-maximized")
        edge_options.add_argument('--ignore-certificate-errors')
        edge_options.add_argument('--ignore-ssl-errors')

        driver = webdriver.Edge(options=edge_options)
        print("🟡 Iniciado com Microsoft Edge")
        return driver
    except Exception as e2:
        print("❌ Não foi possível iniciar nenhum navegador.")
        print("   Dicas:")
        print("   - Instale o Google Chrome: https://www.google.com/chrome/")
        print("   - Ou defina a variável de ambiente CHROME_PATH com o caminho do Chrome.")
        print("     Exemplo (PowerShell): $env:CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'")
        print(f"   Erro Edge: {e2}")
        raise

def extrair_dados_maps(driver, termo_busca):
    try:
        # Codifica o termo de busca para URL (ex: "Bar do Zé" vira "Bar%20do%20Z%C3%A9")
        busca_encoded = urllib.parse.quote(termo_busca)
        # URL correta do Google Maps Search
        url = f"https://www.google.com/maps/search/{busca_encoded}"
        driver.get(url)
        time.sleep(TEMPO_ESPERA)

        telefone = "Não encontrado"
        instagram = "Não encontrado"
        site_geral = "Não encontrado"

        # 1. Tenta pegar o telefone
        try:
            # Procura botões que contêm indicação de telefone
            botoes_fone = driver.find_elements(
                By.XPATH,
                (
                    "//button[contains(@data-item-id,'phone')] | "
                    "//button[contains(@aria-label,'Telefone')] | "
                    "//button[contains(@aria-label,'Phone')]"
                )
            )
            if botoes_fone:
                # Geralmente o texto do telefone está no aria-label ou no texto visível
                aria = botoes_fone[0].get_attribute("aria-label") or ""
                aria = aria.replace("Telefone: ", "").replace("Phone: ", "").strip()
                telefone = aria or botoes_fone[0].text.strip()
                if not telefone:
                    telefone = botoes_fone[0].text.strip()
        except:
            pass

        # 2. Tenta pegar o Site / Instagram
        try:
            # Google Maps costuma usar data-item-id="authority" para site
            botao_site = driver.find_element(By.XPATH, "//a[contains(@data-item-id,'authority')]")
            link = botao_site.get_attribute("href") or ""
            
            if "instagram.com" in link:
                instagram = link
            else:
                site_geral = link
        except:
            pass

        # 3. Fallback: vasculha links da página por Instagram caso o botão não apareça
        if instagram == "Não encontrado":
            try:
                links = driver.find_elements(By.XPATH, "//a[@href]")
                for a in links:
                    href = (a.get_attribute("href") or "").lower()
                    if "instagram.com" in href:
                        instagram = href
                        break
            except:
                pass

        return telefone, instagram, site_geral

    except Exception as e:
        print(f"Erro ao processar {termo_busca}: {e}")
        return "Erro", "Erro", "Erro"

def main():
    print("🚀 Iniciando SUDO Data Scraper (Modo Excel)...")
    
    # Verifica se o arquivo existe
    if not os.path.exists(ARQUIVO_ENTRADA):
        print(f"❌ Erro: O arquivo '{ARQUIVO_ENTRADA}' não foi encontrado na pasta.")
        return

    # Lendo o Excel
    print("📂 Lendo arquivo Excel...")
    try:
        df = pd.read_excel(ARQUIVO_ENTRADA) 
        # Se quiser ler uma aba especifica, use: pd.read_excel(ARQUIVO_ENTRADA, sheet_name='Planilha2')
    except Exception as e:
        print(f"❌ Erro ao abrir Excel: {e}")
        return

    # Limpeza básica dos nomes das colunas
    df.columns = df.columns.str.strip()
    
    # Criar colunas novas se não existirem
    if 'Telefone_SUDO' not in df.columns:
        df['Telefone_SUDO'] = ""
        df['Instagram_SUDO'] = ""
        df['Site_SUDO'] = ""

    driver = configurar_driver()

    try:
        total = len(df)
        for index, row in df.iterrows():
            # Pega Nome e Endereço. Se endereço estiver vazio, usa "Duque de Caxias"
            nome = str(row.get('Nome do Estabelecimento', ''))
            endereco = str(row.get('Endereco', 'Duque de Caxias, RJ'))
            
            # Limpa 'nan' se aparecer
            if nome == 'nan': continue
            if endereco == 'nan': endereco = "Duque de Caxias, RJ"

            termo = f"{nome} {endereco}"

            print(f"[{index+1}/{total}] Buscando: {nome}...")
            
            tel, insta, site = extrair_dados_maps(driver, termo)
            
            # Salva no DataFrame
            df.at[index, 'Telefone_SUDO'] = tel
            df.at[index, 'Instagram_SUDO'] = insta
            df.at[index, 'Site_SUDO'] = site
            
            if tel != "Não encontrado":
                print(f"   ✅ Achei: {tel}")
            else:
                print(f"   🔻 Sem telefone")

            # Salva a cada 5 linhas para garantir
            if index % 5 == 0:
                df.to_excel(ARQUIVO_SAIDA, index=False)

    except KeyboardInterrupt:
        print("\n⚠️ Parando o robô... Salvando o que já foi feito!")
    except Exception as e:
        print(f"❌ Erro: {e}")
    finally:
        df.to_excel(ARQUIVO_SAIDA, index=False)
        driver.quit()
        print(f"\n✅ PROCESSO FINALIZADO!")
        print(f"📂 Abra o arquivo: {ARQUIVO_SAIDA}")

if __name__ == "__main__":
    main()