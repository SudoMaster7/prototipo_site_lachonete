# PROMPT: Desenvolvimento do Protótipo Mestre - Sistema de Delivery SUDO

**Role:** Atue como um Engenheiro de Software Sênior e Especialista em UX/UI com foco em conversão para e-commerce.

**Contexto:**
Estamos criando o "Protótipo Mestre" para a empresa **SUDO**. Este é um sistema White-Label de delivery para pequenos e médios restaurantes (hamburguerias, lanchonetes). O objetivo deste protótipo é ser utilizado em reuniões de vendas para demonstrar a superioridade visual, a velocidade e a facilidade de uso em comparação aos marketplaces tradicionais (iFood/Rappi).

**Objetivo do Código:**
Criar uma aplicação web **Single Page Application (SPA)** focada em mobile, que simule a jornada completa de compra de um cliente, desde a escolha do produto até o envio do pedido via WhatsApp.

**Stack Tecnológica Preferencial:**
- **Frontend:** React.js (Vite) ou HTML5/JS Moderno.
- **Estilização:** Tailwind CSS (para rapidez e visual moderno).
- **Ícones:** Lucide-React ou FontAwesome.
- **Dados:** Um arquivo JSON local (`menuData.js`) simulando o banco de dados.

---

## 1. Requisitos Visuais (Look & Feel)
O design deve despertar fome e ser extremamente profissional.
- **Tema:** "Dark Mode" elegante (fundo escuro destaca as fotos de comida).
- **Cores de Ação:** Laranja Queimado (#F97316) ou Amarelo Mostarda (cores que estimulam apetite) para botões de compra.
- **Tipografia:** Sans-serif moderna, legível e com pesos bold para preços.
- **Fotos:** Use placeholders do Unsplash (ex: keywords 'burger', 'fries', 'soda').

## 2. Estrutura da Aplicação

### A. Header (Fixo)
- Logo da loja (Fictícia: "SUDO Burger").
- Status da loja (Aberto/Fechado) com indicador visual (bolinha verde).
- Botão de Carrinho flutuante com contador de itens.

### B. Hero Section (Capa)
- Banner rotativo ou estático com foto de alta qualidade de um lanche.
- Título de impacto e uma sub-legenda.
- Informações rápidas: Tempo de entrega estimado e Taxa de entrega.

### C. Navegação de Categorias
- Uma barra de rolagem horizontal (scroll lateral) com "pílulas" de categorias (Ex: Lanches, Porções, Bebidas, Sobremesas).
- Ao clicar, rola suavemente até a seção correspondente.

### D. Listagem de Produtos (Menu)
- Cards de produtos. Cada card deve ter:
    - Foto à esquerda ou topo (arredondada).
    - Título do prato.
    - Descrição curta (2 linhas max).
    - Preço (destacado).
    - Botão "Adicionar".

### E. Modal de Produto (Detalhes) - *Opcional mas recomendado para "Opcionais"*
- Ao clicar no produto, abre um modal/bottom sheet.
- Opção de Adicionais (Ex: "Bacon Extra + R$ 3,00") usando checkboxes.
- Campo de observação.
- Contador de quantidade.
- Botão grande de "Adicionar ao Pedido".

### F. Carrinho (Checkout Simplificado)
- Lista dos itens selecionados.
- Somatória automática (Subtotal + Entrega = Total).
- **Input:** Nome do Cliente.
- **Input:** Endereço de Entrega (ou opção "Retirar no Balcão").
- **Seletor:** Forma de Pagamento (PIX, Cartão na Entrega, Dinheiro).

## 3. A "Matadora" (Integração WhatsApp)
Este é o diferencial da venda. O botão "Finalizar Pedido" **NÃO** deve levar a um gateway de pagamento complexo.
- **Ação:** Ele deve formatar todo o pedido em uma string de texto organizada.
- **Output:** Abrir a API do WhatsApp (`https://wa.me/numerodaloja?text=...`) com a mensagem pronta.
- **Formato da Mensagem:**
  ```text
  Olá, gostaria de fazer um pedido! 🍔
  *Pedido #1234*

  1x X-SUDO Bacon (R$ 35,00)
     + Extra Queijo
  1x Coca-Cola Lata (R$ 6,00)

  *Taxa de Entrega:* R$ 5,00
  *TOTAL:* R$ 46,00

  *Cliente:* João Silva
  *Endereço:* Rua das Flores, 123
  *Pagamento:* Cartão na Entrega
4. Instruções de Entrega
Por favor, gere o código completo dividido em:

data.js: O array de objetos com os produtos (Mock Data).

App.jsx: O componente principal com a lógica de estado (carrinho, modal, filtros).

components/ProductCard.jsx: O componente visual do produto.

components/CartModal.jsx: O componente do carrinho e lógica do WhatsApp.

Instruções de como rodar o projeto.

Nota: O código deve ser limpo, comentado e focado em performance. O visual deve ser "Mobile First".