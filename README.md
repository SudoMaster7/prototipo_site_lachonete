# 🍔 SUDO Burger - Sistema de Delivery Premium

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![Status](https://img.shields.io/badge/status-ready-success)

## 📋 Descrição

Protótipo Mestre de Sistema de Delivery White-Label desenvolvido para demonstrações de vendas. Este é um sistema moderno, focado em conversão, que demonstra superioridade visual e de experiência em comparação aos marketplaces tradicionais (iFood/Rappi).

### ✨ Características Principais

- **Dark Theme Premium** - Design elegante que destaca os produtos
- **Mobile-First** - Otimizado para dispositivos móveis
- **WhatsApp Integration** - Pedidos enviados diretamente via WhatsApp (sem complexidade de gateways)
- **Gamificação** - Barra de progresso para frete grátis
- **Upsell Inteligente** - Sugestões de produtos complementares
- **Animações Suaves** - Experiência premium similar a apps nativos
- **Zero Dependências** - Roda diretamente no navegador sem Node.js

---

## 🚀 Como Usar

### Método 1: Abrir Diretamente (Recomendado para Demos)

1. Navegue até a pasta do projeto
2. **Duplo clique** no arquivo `index.html`
3. O site abrirá automaticamente no seu navegador padrão

### Método 2: Servidor Local (Para Desenvolvimento)

Se você tiver Python instalado:

```bash
# Python 3
python -m http.server 8000

# Depois abra: http://localhost:8000
```

Se você tiver Node.js instalado:

```bash
# Instalar servidor simples
npm install -g http-server

# Executar
http-server

# Depois abra: http://localhost:8080
```

---

## 📱 Configuração do WhatsApp

Para configurar o número do WhatsApp que receberá os pedidos:

1. Abra o arquivo: `js/menuData.js`
2. Localize a linha:
   ```javascript
   phone: "5511999999999", // WhatsApp number
   ```
3. Substitua pelo seu número no formato: **Código do País + DDD + Número**
   - Exemplo Brasil: `5511987654321`
   - Sem espaços, traços ou caracteres especiais

---

## 🎨 Personalização (White-Label)

### Alterar Cores do Tema

Edite o arquivo `styles/theme.css`:

```css
:root {
    /* Cor Principal (Laranja) */
    --primary-rgb: 249, 115, 22;
    
    /* Cor Secundária (Amarelo) */
    --secondary-rgb: 234, 179, 8;
}
```

**Dica:** Use [este conversor](https://www.rapidtables.com/convert/color/hex-to-rgb.html) para converter HEX para RGB.

### Alterar Nome da Loja

1. **No arquivo `index.html`** (linha ~21):
   ```html
   <div class="logo">🍔 SUDO Burger</div>
   ```

2. **No arquivo `js/menuData.js`** (linha ~8):
   ```javascript
   name: "SUDO Burger",
   ```

### Alterar Produtos

Edite o array `PRODUCTS` no arquivo `js/menuData.js`:

```javascript
{
    id: 1,
    category: "lanches", // lanches, porcoes, bebidas, sobremesas
    name: "Seu Produto",
    description: "Descrição do produto",
    price: 28.00,
    image: "URL_DA_IMAGEM",
    isPopular: true, // Adiciona badge "Mais Vendido"
    hasOptions: true, // Se tem adicionais
    options: [
        { id: "extra", name: "Extra Bacon", price: 3.00 }
    ]
}
```

### Alterar Taxa de Entrega

No arquivo `js/menuData.js`:

```javascript
const STORE_INFO = {
    deliveryFee: 5.00, // Taxa de entrega em R$
    freeDeliveryThreshold: 40.00, // Valor mínimo para frete grátis
};
```

---

## 📂 Estrutura do Projeto

```
DEMO SUDO SITE FOOD/
│
├── index.html              # Página principal
│
├── styles/                 # Estilos CSS
│   ├── theme.css          # Variáveis de tema
│   ├── main.css           # Layouts principais
│   ├── components.css     # Componentes UI
│   └── animations.css     # Animações
│
├── js/                    # JavaScript
│   ├── menuData.js        # Dados dos produtos
│   ├── utils.js           # Funções utilitárias
│   ├── cart.js            # Gerenciamento do carrinho
│   ├── ui.js              # Interações da interface
│   └── main.js            # Inicialização
│
├── task.md                # Lista de tarefas
├── Implemetation_plan.md  # Plano de implementação
└── README.md              # Este arquivo
```

---

## 🎯 Fluxo de Uso (Sales Script)

Use este roteiro durante demonstrações de vendas:

### 1. **The Hook** (O Gancho)
> "Veja como é diferente de um marketplace tradicional..."
- Abra o site
- Destaque o design premium e dark mode
- Mostre o badge de avaliações (Social Proof)

### 2. **The Flow** (O Fluxo)
> "A experiência é intuitiva e rápida..."
- Clique em um hambúrguer
- Adicione bacon extra
- Mostre o toast de confirmação instantâneo
- Abra o carrinho

### 3. **The Upsell** (A Venda Adicional)
> "Veja como o sistema aumenta o ticket médio automaticamente..."
- Mostre a barra de progresso: "Faltam R$ X para frete grátis"
- Destaque o widget "Vai bem com..."
- Adicione uma bebida sugerida
- Mostre a barra se completar

### 4. **The Close** (O Fechamento)
> "E aqui está o diferencial: simplicidade total!"
- Preencha nome, endereço e pagamento
- Clique em "Finalizar Pedido"
- **Mostre o WhatsApp abrindo com o pedido formatado profissionalmente**
- Destaque: "Sem mensalidades de marketplace, sem comissões por pedido!"

---

## 🔥 Diferenciais para Vendas

Use estes pontos durante pitch de vendas:

### ✅ Comparado ao iFood/Rappi:

| Característica | SUDO System | Marketplaces |
|----------------|-------------|--------------|
| **Comissão por Pedido** | 0% | 12-30% |
| **Mensalidade** | Única (licença) | Variável + taxas |
| **Controle de Dados** | 100% do cliente | Marketplace |
| **Personalização** | Total (White-Label) | Limitada |
| **Checkout** | WhatsApp direto | Gateway complexo |
| **Upsell** | Inteligente e automático | Básico |

### 💡 Argumentos de Venda:

1. **"Pedidos sem taxa"** - Todo pedido pelo iFood tem 12-30% de comissão
2. **"Seus clientes, suas regras"** - Sem depender de algoritmos
3. **"WhatsApp = Familiaridade"** - Cliente já usa todo dia
4. **"Setup em minutos"** - Sem burocracia, sem integração complexa

---

## 🛠️ Troubleshooting

### O WhatsApp não está abrindo?

1. Verifique se o número está no formato correto: `5511999999999`
2. Teste em um dispositivo móvel (funciona melhor)
3. Certifique-se de ter o WhatsApp instalado

### As imagens não carregam?

- As imagens vêm do Unsplash e requerem conexão com internet
- Para demo offline, substitua por imagens locais

### Os estilos não aparecem?

- Certifique-se de que todos os arquivos CSS estão na pasta `styles/`
- Verifique se abriu o `index.html` e não outro arquivo

---

## 📊 Próximos Passos (Roadmap)

Funcionalidades que podem ser adicionadas:

- [ ] Integração com API de pagamento
- [ ] Painel administrativo
- [ ] Sistema de cupons de desconto
- [ ] Histórico de pedidos
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Multi-idiomas

---

## 📞 Suporte

Para dúvidas sobre personalização ou implementação, consulte os arquivos:
- `Implemetation_plan.md` - Detalhes técnicos
- `task.md` - Checklist de funcionalidades

---

## 📄 Licença

Sistema desenvolvido para uso exclusivo em demonstrações de vendas SUDO.

**Versão:** 1.0.0  
**Última Atualização:** Janeiro 2026  

---

## 🎨 Créditos

- **Imagens:** [Unsplash](https://unsplash.com)
- **Fontes:** [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)
- **Ícones:** SVG customizados

---

<div align="center">

**Desenvolvido com ❤️ para maximizar conversões**

</div>
