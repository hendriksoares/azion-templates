# **Azion Templates**

## **1. Wordpress Azion with AWS**

Esse template tem como objetivo criar uma blog Wordpress a partir do zero utilizando a infraestrutura da AWS e configurar sobre essa origem uma edge application na Azion.

### **1.1. Variábeis de ambiente**

Para iniciar a configuração precisamos das chaves de acesso à AWS: 
- **AWS Access Key ID**;
- **AWS Secret Access Key**;

> **Obs:** Essa chaves devem ser temporárias apenas para execução do template e devem ter permissões para criar máquinas virtuais EC2 dentro de sua conta AWS.

Além disso, precisamos de outras variáveis de configuração:

Configurações Wordpress:

>- **Database User** (MYSQL_DB_USER) usuário para o banco de dados; 
>- **Database User Password** (MYSQL_DB_PASSWORD) senha do usuário;
>- **Database Root Password** (MYSQL_DB_ROOT_PASSWORD) senha do usuário root; 

configurações Azion:

>- **Application Name** (AZION_APP_NAME) nome da aplicação;
>- **Azion Api URL** (AZION_API_URL) url da api da azion;
>- **Azion Personal Token** (AZION_PERSONAL_TOKEN) token pessoal para acesso a conta da AWS;

> **Obs:** Para execução no script runner podemos usar o cookie de sessão para gerar o token de acesso.

### **1.2. Execução** 

A execução do template pode ser dividida em 2 etapas:

1. **Criação da infraestrutura na AWS**
  - Execução da stack (cloudformation);
  - Construção da máquina EC2 e instalação do Wordpress;
  - Definição do IP de acesso a máquina virtual;

2. **Configuração aplicação**
  - Construção da edge application;
  - Definição do domínio com origem apontada para o IP da máquina virtual;
  - Definindo as regras de cache;
  - Aplicandos as regras de cache e comportamento (rules engine);

### **1.3. Notas**

>- Durante o criação da EC2 é necessário a criação de um par de chave (KeyPair) na AWS. Essa chave terá o mesmo valor do nome da aplicação (AZION_APP_NAME);
>- O primeiro acesso ao Wordpress deve ocorrer via URL da Azion (Domain), pois o blog irá associar a URL base atráves da URL do primeiro acesso;
>- Devido a acesso a conta de terceiro na AWS o processo não tem rollback por questões de segurança. (Não queremos a permissão de excluir dentro da AWS);
>- Existe uma padrão de senha mínimo para o banco SQL ( regex: [a-zA-Z0-9]*);

### **1.4. Melhorias**
- A chave fornecida da AWS não tem permissão para executar as ações necessárias (ou inválida);
- Tratar erros de chamadas para Azion API