"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
            amqp.connect(this.rabbitMQUrl, (error, connection) => {
                if (error) {
                    throw new Error('Erro ao conectar ao RabbitMQ');
                }
                connection.createChannel((error, channel) => {
                    if (error) {
                        throw new Error('Erro ao criar canal de comunicação');
                    }
                    channel.assertQueue(this.queueName, { durable: false });
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
            amqp.connect(this.rabbitMQUrl, (error, connection) => {
                if (error) {
                    throw new Error('Erro ao conectar ao RabbitMQ');
                }
                connection.createChannel((error, channel) => {
                    if (error) {
                        throw new Error('Erro ao criar canal de comunicação');
                    }
                    channel.assertQueue(this.queueName, { durable: false });
                    channel.consume(this.queueName, (message) => {
                        if (message) {
                            const content = message.content.toString();
                            const parsedMessage = JSON.parse(content);
                            callback(parsedMessage);
                            console.log(`[RabbitMQ] Mensagem recebida: ${content}`);
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
