
# Configurando Certificados Autoassinados com mkcert

Este guia detalha como instalar e configurar o `mkcert` para gerar certificados autoassinados confiáveis para desenvolvimento local no ubuntu. Para mais informações sobre outros sistemas operacionais.
 consulte [github mkcert](https://github.com/FiloSottile/mkcert)

## Instalação

### Ubuntu

1.  **Instale as dependências:**

    ```bash
    sudo apt update
    sudo apt install libnss3-tools
    ```

2.  **Instale o `mkcert`:**

    * Usando `brew` (se você tiver o Homebrew instalado no Linux):

        ```bash
        brew install mkcert
        ```

## Configuração

1.  **Instale a Autoridade de Certificação (CA) raiz local:**

    * Após a instalação do `mkcert`, execute o seguinte comando no seu terminal:

        ```bash
        mkcert -install
        ```

    * Este comando instalará a CA raiz local no armazenamento de certificados do seu sistema.

2.  **Crie um certificado para `localhost`:**

    Crie uma pasta na raiz do projeto chamada `self-signed_certificate`:

    * Dentro da pasta `self-signed_certificate` execute o seguinte comando no seu terminal:

        ```bash
        mkcert localhost
        ```

    * Este comando criará dois arquivos: `localhost.pem` (o certificado) e `localhost-key.pem` (a chave privada).

    * Subistitua o caminho do arquivo no seu arquivo `.env`.

    ```bash
       PRIVATE_KEY_PATH='path_da_key_do_certificado_autoassinado'
       CERTIFICATE_PATH='path_do_certificado_autoassinado'
    ```

## Usando o Certificado

1.  **No seu servidor Node.js**

    * O certificado local autoassinado está sendo usando assim:   

        ```javascript
        // Carregar certificado e chave
        const privateKeyPath = process.env.PRIVATE_KEY_PATH;
        const certificatePath = process.env.CERTIFICATE_PATH;

        const options = {
            key: fs.readFileSync(privateKeyPath),
             cert: fs.readFileSync(certificatePath),
        };
        ```

## Observações

* Certifique-se de manter os arquivos dentro de `/self-signed_certificate` seguro, pois ela contém a chave privada do seu certificado.
* Não compartilhe a chave privada com outras pessoas e não a inclua em repositórios públicos.
* Lembre de manter a pasta `/self-signed_certificate` ao seu arquivo `.gitignore` para evitar que ele seja acidentalmente enviado para o controle de versão.
