import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CommanService {
    private moralisApi: AxiosInstance;

    private transporter: nodemailer.Transporter;

    constructor() {
        this.moralisApi = axios.create({
            baseURL: "https://deep-index.moralis.io/api/v2/erc20",
            headers: {
                "X-API-Key": process.env.MORALIS_API_KEY
            }
        });

        this.transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: 'apikey',
              pass: process.env.SENDGRID_API_KEY,
            },
          });
    }

    public async getEthAndPolyPrices():  Promise<{ ethereum: number; polygon: number }> {
        const ethereumResponse = await this.moralisApi.get("/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/prices")
        const polygonResponse = await this.moralisApi.get("/0x0c1d29b3aa5db5b6e5c693e219e9b92e9cfbe6cf/prices")
        return {
            ethereum: ethereumResponse?.data?.price || 0,
            polygon: polygonResponse?.data?.price || 0
        }
    }

    public async getEthAndBtcPrices(): Promise<{ ethPrice: number; btcPrice: number }> {
        const ethereumResponse = await this.moralisApi.get("/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/prices")
        const btcResponse = await this.moralisApi.get("/0xBTC/prices")
        return {
            ethPrice: ethereumResponse.data?.price || 0,
            btcPrice: btcResponse.data?.price || 0,
          };
    }

    public async sendEmail(email: string, subject: string, text: string) {
        const mailOptions = {
            from: 'no-reply@blockchaintracker.com',
            to: email,
            subject: subject,
            text: text,
          };

        await this.transporter.sendMail(mailOptions);
    }


}
