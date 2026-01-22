# 🚀 Deploy na Vercel - SUDO Site Food

## Opção 1: Deploy via Vercel CLI (Rápido)

### 1. Instale a Vercel CLI
```powershell
npm install -g vercel
```

### 2. Faça Deploy
```powershell
vercel
```

Siga as instruções interativas:
- Confirme o projeto
- Selecione `./` como diretório root
- Deixe as configurações padrão

**Resultado:** Seu site estará online em `https://sudo-site-food-*.vercel.app`

---

## Opção 2: Deploy via GitHub (Recomendado)

### 1. Crie um repositório no GitHub
- Vá para https://github.com/new
- Nome: `sudo-site-food`
- Clique "Create repository"

### 2. Push do código local
```powershell
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/sudo-site-food.git
git push -u origin main
```

### 3. Conecte com Vercel
- Vá para https://vercel.com
- Clique "New Project"
- Selecione "Import Git Repository"
- Escolha seu repositório `sudo-site-food`
- Clique "Deploy"

**Resultado:** Deployment automático a cada push para `main`

---

## 📝 Notas

- **Arquivos Estáticos:** O site é 100% estático (HTML/CSS/JS), sem backend
- **bot_sentry.py:** Continua rodando localmente via `.venv`
- **Excel Enriquecido:** Gerado localmente com `Tabela_Enriquecida_SUDO.xlsx`
- **Domínio Custom:** Após deploy, vá em Vercel Dashboard → Settings → Domains para conectar domínio próprio

---

## ✅ Pronto!

Seu site SUDO Food estará ao vivo em minutos! 🎉
