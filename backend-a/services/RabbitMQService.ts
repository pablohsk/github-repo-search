import * as amqp from 'amqplib/callback_api';

export class RabbitMQService {
  private readonly queueName: string;
  private readonly rabbitMQUrl: string;

  constructor(queueName: string, rabbitMQUrl: string) {
    this.queueName = queueName;
    this.rabbitMQUrl = rabbitMQUrl;
  }

  async sendMessage(message: any) {
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
    } catch (error) {
      console.error('Erro ao enviar mensagem para o RabbitMQ:', error);
      throw new Error('Erro ao enviar mensagem para o RabbitMQ');
    }
  }

  async receiveMessage(callback: (message: any) => void) {
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
    } catch (error) {
      console.error('Erro ao receber mensagem do RabbitMQ:', error);
      throw new Error('Erro ao receber mensagem do RabbitMQ');
    }
  }
}
