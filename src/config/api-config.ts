import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) { }

    private getString(key: string): string {
        const value = this.get(key);
        return value.replace(/\\n/g, '\n');
    }

    get blockNativeConfig() {
        return {
            url: this.getString('BLOCK_NATIVE_URL'),
            apiKey: this.getString('BLOCK_NATIVE_APIKEY'),
        };
    }


    private get(key: string): string {
        const value = this.configService.get<string>(key);
        if (!value) {
            throw new Error(key + ' environment variable not set');
        }
        return value;
    }
}
