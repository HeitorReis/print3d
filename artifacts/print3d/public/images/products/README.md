# Fotos dos produtos

Para adicionar fotos ao carrossel, crie uma pasta com o `id` do produto e coloque os arquivos dentro dela.
O app le automaticamente todos os arquivos de imagem encontrados nessa pasta, em ordem alfabetica/numerica.
Se houver mais de 3 fotos, todas aparecem. Se houver menos de 3, aparecem somente as disponiveis.

Formatos aceitos: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif` e `.gif`.

Exemplo:

```text
public/images/products/aviao-embraer-c390-5cm/foto-1.png
public/images/products/aviao-embraer-c390-5cm/foto-2.png
public/images/products/aviao-embraer-c390-5cm/foto-3.png
public/images/products/aviao-embraer-c390-5cm/foto-4.png
public/images/products/aviao-embraer-c390-5cm/video-preview.gif
```

Se a pasta do produto estiver vazia ou nao existir, o app usa a imagem principal antiga do produto como fallback.
