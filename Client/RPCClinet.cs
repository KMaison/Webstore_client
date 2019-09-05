using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    class RPCClinet
    {
        private readonly IConnection connection;
        private readonly IModel channel,buying_channel;
        private readonly string replyQueueName, replyQueueName1;
        private readonly EventingBasicConsumer consumer,consumer1;
        private readonly BlockingCollection<string> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props,props1;

        public RPCClinet()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };

            connection = factory.CreateConnection();

            channel = connection.CreateModel();
            
            buying_channel = connection.CreateModel();

            replyQueueName = channel.QueueDeclare().QueueName;
            replyQueueName1 = buying_channel.QueueDeclare().QueueName;
            consumer = new EventingBasicConsumer(channel);
            consumer1 = new EventingBasicConsumer(buying_channel);

            props = channel.CreateBasicProperties();
            props1 = buying_channel.CreateBasicProperties();

            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;
            props.ReplyTo = replyQueueName;

            var correlationId1 = Guid.NewGuid().ToString();
            props1.CorrelationId = correlationId1;
            props1.ReplyTo = replyQueueName1;

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {
                    respQueue.Add(response);
                }
            };
            consumer1.Received += (model, ea) =>
            {
                var body = ea.Body;
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId1)
                {
                    respQueue.Add(response);
                }
            };
        }

        public string CallReservation(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);

           

            channel.BasicPublish(
                exchange: "",
                routingKey: "reservation_queue",
                basicProperties: props,
                body: messageBytes);

            channel.BasicConsume(
                consumer: consumer,
                queue: replyQueueName,
                autoAck: true);
            var a = respQueue.Take();
            
            return a;
        }
        public string CallBuying(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            buying_channel.BasicPublish(
                exchange: "",
                routingKey: "buying_queue",
                basicProperties: props1,
                body: messageBytes);

            buying_channel.BasicConsume(
                consumer: consumer1,
                queue: replyQueueName1,
                autoAck: true);
            
            var a = respQueue.Take();
           
            return a;
        }

        public void Close()
        {
            connection.Close();
        }
    }
}
