var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const amqp = __importStar(require("amqplib/callback_api"));
class RabbitMQService {
    queueName;
    rabbitMQUrl;
    constructor(queueName, rabbitMQUrl) {
        this.queueName = queueName;
        this.rabbitMQUrl = rabbitMQUrl;
    }
    async sendMessage(message) {
        try {
            // Conectar ao servidor RabbitMQ
            amqp.connect(this.rabbitMQUrl, (error, connection) => {
                if (error) {
                    throw new Error('Erro ao conectar ao RabbitMQ');
                }
                // Criar um canal para comunicação
                connection.createChannel((error, channel) => {
                    if (error) {
                        throw new Error('Erro ao criar canal de comunicação');
                    }
                    // Declarar a fila de destino
                    channel.assertQueue(this.queueName, { durable: false });
                    // Enviar a mensagem para a fila
                    channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));
                    console.log(`[RabbitMQ] Mensagem enviada: ${JSON.stringify(message)}`);
                });
            });
        }
        catch (error) {
            console.error('Erro ao enviar mensagem para o RabbitMQ:', error);
            throw new Error('Erro ao enviar mensagem para o RabbitMQ');
        }
    }
    async receiveMessage(callback) {
        try {
            // Conectar ao servidor RabbitMQ
            amqp.connect(this.rabbitMQUrl, (error, connection) => {
                if (error) {
                    throw new Error('Erro ao conectar ao RabbitMQ');
                }
                // Criar um canal para comunicação
                connection.createChannel((error, channel) => {
                    if (error) {
                        throw new Error('Erro ao criar canal de comunicação');
                    }
                    // Declarar a fila de origem
                    channel.assertQueue(this.queueName, { durable: false });
                    // Consumir mensagens da fila
                    channel.consume(this.queueName, (message) => {
                        if (message) {
                            const content = message.content.toString();
                            const parsedMessage = JSON.parse(content);
                            callback(parsedMessage);
                            console.log(`[RabbitMQ] Mensagem recebida: ${content}`);
                            // Confirmar o recebimento da mensagem
                            channel.ack(message);
                        }
                    });
                });
            });
        }
        catch (error) {
            console.error('Erro ao receber mensagem do RabbitMQ:', error);
            throw new Error('Erro ao receber mensagem do RabbitMQ');
        }
    }
}
exports.RabbitMQService = RabbitMQService;
