import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'ws';
// WebSocketGateway yaratyapti.
@WebSocketGateway({ transports: ['websocket'], secure: false }) //faqat WebSocket protokolini ishlatadi,  HTTPS emas, HTTPda ishlaydi.
// iplament => nusxa olish
export class SocketGateway implements OnGatewayInit { //SocketGateway degan klass yaratyapti, OnGatewayInit interfeysini implement qiladi 
	private logger: Logger = new Logger('SocketEventsGateway');// log yozish uchun
	private summaryClient: number = 0;//WebSocketga ulangan mijozlar sonini hisoblab boradi.

	public afterInit(server: Server) {//Server ishga tushganda chaqiriladi.
		this.logger.log(`WebSocket Server initialized total: ${this.summaryClient}`);
	}//Hozircha faqat umumiy mijozlar sonini log qiladi (summaryClient, boshlanishda 0).

	handleConnection(client: WebSocket, ...args: any[]) {
		this.summaryClient++;//Har bir yangi mijoz ulanganida chaqiriladi.
		this.logger.log(`== Client connected total: ${this.summaryClient} == `);//summaryClient ni 1 ga oshiradi.Log yoziladi
	}





	handleDisconnect(client: WebSocket) {
		this.summaryClient--;//disonnect qilganda user
		this.logger.log(`== Client disconnected left total: ${this.summaryClient} ==`);//summaryClient 1 taga kamayadi.
	}

	
	@SubscribeMessage('message')//Client "message" nomli xabar yuborsa, shu handler ishlaydi.


	public handleMessage(client: WebSocket, payload: any): string {
		return 'Hello world';//Javob sifatida 'Hello world' qaytariladi.
	}
}
