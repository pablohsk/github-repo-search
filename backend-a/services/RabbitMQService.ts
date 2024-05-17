import * as amqp from 'amqplib/callback_api';

export class RabbitMQService {
  private readonly queueName: string;
  private rabbitMQUrl: string = '';

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  setRabbitMQUrl(url: string) {
    this.rabbitMQUrl = url;
  }

  async sendMessage(message: any) {
    return new Promise<void>((resolve, reject) => {
      amqp.connect(this.rabbitMQUrl, (error, connection) => {
        if (error) {
          reject(new Error('Erro ao conectar ao RabbitMQ'));
          return;
        }

        connection.createChannel((error, channel) => {
          if (error) {
            reject(new Error('Erro ao criar canal de comunicação'));
            return;
          }

          channel.assertQueue(this.queueName, { durable: false });

          channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));

          console.log(`[RabbitMQ] Mensagem enviada: ${JSON.stringify(message)}`);

          resolve();
        });
      });
    });
  }

  async receiveMessage(callback: (message: any) => void) {
    return new Promise<void>((resolve, reject) => {
      amqp.connect(this.rabbitMQUrl, (error, connection) => {
        if (error) {
          reject(new Error('Erro ao conectar ao RabbitMQ'));
          return;
        }

        connection.createChannel((error, channel) => {
          if (error) {
            reject(new Error('Erro ao criar canal de comunicação'));
            return;
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

          resolve();
        });
      });
    });
  }
}
