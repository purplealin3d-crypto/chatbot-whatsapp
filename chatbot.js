// Leitor de QR Code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');

// Configuração especial para Replit
const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Exibe QR Code no terminal
client.on('qr', qr => {
    console.log('📱 Escaneie o QR Code abaixo para conectar:');
    qrcode.generate(qr, { small: true });
});

// Loga quando conectado
client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado.');
});

// Logs de autenticação e desconexão (pra depurar)
client.on('authenticated', () => {
    console.log('🔐 Sessão autenticada!');
});

client.on('auth_failure', msg => {
    console.error('❌ Falha na autenticação:', msg);
});

client.on('disconnected', reason => {
    console.log('🔌 Cliente desconectado:', reason);
});

// Inicializa o cliente
client.initialize();

// Função delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Escuta mensagens recebidas
client.on('message', async msg => {
    console.log('📩 Mensagem recebida:', msg.body);

    // Gatilho de saudação
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname || 'amigo';

        await client.sendMessage(
            msg.from,
            'Olá, ' + name.split(" ")[0] + '! Sou o assistente virtual da empresa tal. Como posso ajudá-lo hoje?\n\nPor favor, digite uma das opções abaixo:\n\n1 - Como funciona\n2 - Valores dos planos\n3 - Benefícios\n4 - Como aderir\n5 - Outras perguntas'
        );

        await delay(3000);
        await chat.sendStateTyping();
        await delay(5000);
    }

    // Opção 1
    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Nosso serviço oferece consultas médicas 24 horas por dia, 7 dias por semana, diretamente pelo WhatsApp.\n\nNão há carência, o que significa que você pode começar a usar nossos serviços imediatamente após a adesão.\n\nOferecemos atendimento médico ilimitado, receitas e acesso a cursos gratuitos.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'COMO FUNCIONA?\nÉ muito simples.\n\n1º Passo: Faça seu cadastro e escolha o plano que desejar.\n\n2º Passo: Após o pagamento, você já terá acesso à área exclusiva para começar seu atendimento na mesma hora.\n\n3º Passo: Sempre que precisar, é só chamar.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🔗 Link para cadastro: https://site.com');
    }

    // Opção 2
    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Plano Individual:* R$22,50/mês\n\n*Plano Família:* R$39,90/mês (você + 3 dependentes)\n\n*Plano TOP Individual:* R$42,50/mês com benefícios extras\n\n*Plano TOP Família:* R$79,90/mês (você + 3 dependentes).');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🔗 Link para cadastro: https://site.com');
    }

    // Opção 3
    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🎁 Sorteio de prêmios todo ano.\n👩‍⚕️ Atendimento médico ilimitado 24h.\n💊 Receitas médicas digitais.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🔗 Link para cadastro: https://site.com');
    }

    // Opção 4
    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Você pode aderir aos planos diretamente pelo nosso site ou via WhatsApp.\n\nApós a adesão, você terá acesso imediato.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🔗 Link para cadastro: https://site.com');
    }

    // Opção 5
    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui neste WhatsApp ou visite nosso site: https://site.com');
    }
});
