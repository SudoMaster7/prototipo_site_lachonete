# 🚀 INICIO RÁPIDO - SUDO Burger

## ⚡ Para Usar Agora (30 segundos)

1. **Duplo clique** no arquivo `index.html`
2. O site abre no navegador automaticamente
3. Pronto! Já pode demonstrar

---

## ⚙️ Configuração Essencial (2 minutos)

### 1. Configure o WhatsApp

Abra: `js/menuData.js`

Procure pela linha 8:
```javascript
phone: "5511999999999", // <-- MUDE AQUI
```

Mude para seu número:
- Formato: Código país + DDD + Número
- Exemplo: `5511987654321`
- **SEM espaços ou traços**

### 2. Mude o Nome da Loja (Opcional)

**No arquivo:** `index.html` (linha 21)
```html
<div class="logo">🍔 SEU NOME AQUI</div>
```

**No arquivo:** `js/menuData.js` (linha 8)
```javascript
name: "SEU NOME AQUI",
```

### 3. Mude as Cores (Opcional)

**No arquivo:** `styles/theme.css` (linhas 9-10)
```css
--primary-rgb: 249, 115, 22;  /* Laranja */
--secondary-rgb: 234, 179, 8; /* Amarelo */
```

Use este conversor: https://www.rapidtables.com/convert/color/hex-to-rgb.html

---

## 🎯 Roteiro de Demonstração

### 1. ABERTURA (30 seg)
- Abra o site
- Deixe o cliente ver o design premium
- Aponte para "⭐ 4.9 (1.2k avaliações)"

### 2. NAVEGAÇÃO (1 min)
- Clique em um hambúrguer
- Adicione "Bacon Extra"
- Mostre a notificação "✓ Adicionado"

### 3. CARRINHO (1.5 min)
- Abra o carrinho
- **MOSTRE:** Barra de progresso "Faltam R$..."
- **MOSTRE:** "Vai bem com..." (sugestões)
- Adicione uma bebida
- Veja a barra completar

### 4. FECHAMENTO (1 min)
- Preencha: Nome, Endereço, Pagamento
- Clique "Finalizar Pedido"
- **WhatsApp abre com pedido formatado!**
- **ARGUMENTO:** "Sem comissão de marketplace!"

**Tempo total:** ~4 minutos

---

## 🔧 Personalizações Rápidas

### Adicionar Produto

Edite `js/menuData.js`, adicione no array `PRODUCTS`:

```javascript
{
    id: 13, // Próximo número
    category: "lanches", // lanches/porcoes/bebidas/sobremesas
    name: "Nome do Produto",
    description: "Descrição aqui",
    price: 30.00,
    image: "URL_DA_IMAGEM",
    isPopular: true, // Badge "Mais Vendido"
    hasOptions: true,
    options: [
        { id: "extra", name: "Extra X", price: 3.00 }
    ]
}
```

### Mudar Taxa de Entrega

Edite `js/menuData.js` (linhas 10-11):
```javascript
deliveryFee: 5.00,              // Taxa em R$
freeDeliveryThreshold: 40.00,   // Mínimo para grátis
```

---

## 💰 Argumentos de Venda

| Marketplace (iFood) | SUDO System |
|---------------------|-------------|
| Comissão 12-30% POR PEDIDO | 0% comissão |
| Mensalidade + taxas | Pagamento único |
| Cliente do iFood | SEU cliente |
| Layout genérico | Personalizado |
| Checkout complexo | WhatsApp (simples) |

### Frase de Ouro:
> "Cada pedido de R$ 50 no iFood, você paga R$ 10 de comissão. Com 100 pedidos/mês, são R$ 1.000 que você PERDE. Esse sistema se paga em 1 mês."

---

## 📱 Testando no Celular

1. Coloque todos os arquivos em uma pasta
2. Abra `index.html` no celular
   - Android: Chrome
   - iPhone: Safari
3. O WhatsApp funcionará PERFEITAMENTE no mobile

---

## ❓ Problemas Comuns

### WhatsApp não abre?
✅ Verifique o número (formato: 5511999999999)  
✅ Teste no celular (funciona melhor)  
✅ Certifique-se que WhatsApp está instalado

### Imagens não carregam?
✅ Precisa de internet (vêm do Unsplash)  
✅ Para demo offline, use imagens locais

### Estilos não aparecem?
✅ Todos os arquivos .css precisam estar na pasta `styles/`  
✅ Todos os arquivos .js precisam estar na pasta `js/`

---

## 📚 Documentação Completa

- `README.md` - Documentação completa
- `Implemetation_plan.md` - Detalhes técnicos
- `task.md` - Checklist de funcionalidades

---

## 🎨 Recursos Externos

- **Imagens:** https://unsplash.com (busque: burger, fries, drinks)
- **Conversor de Cores:** https://www.rapidtables.com/convert/color/hex-to-rgb.html
- **Ícones Emoji:** https://emojipedia.org

---

## ✅ Checklist Pré-Demo

- [ ] Configurei o número do WhatsApp
- [ ] Testei abrir o `index.html`
- [ ] Testei adicionar um produto ao carrinho
- [ ] Testei o botão "Finalizar Pedido"
- [ ] WhatsApp abriu com a mensagem

---

<div align="center">

## 🚀 PRONTO PARA VENDER!

**Dúvidas?** Leia o `README.md` completo

</div>
