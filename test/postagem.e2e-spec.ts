import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('Testes dos Módulos das postagens (e2e)', () => {

    let token: any;
    let usuarioId: any;
    let app: INestApplication;
    let postagemId: any
  
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_blogpessoal_test',
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
            dropSchema: true
          }),
        ],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
  
    });
  
    afterAll(async () => {
      await app.close();
    });
    it ('01 - should register a new user', async () => {
      const resposta = await request (app.getHttpServer ())
      .post ('/usuario/cadastrar')
      .send({
        nome: 'root',
        usuario: 'rootroot',
        senha: 'rootroot',
        foto: ' '
      });
      usuarioId = resposta.body.id;
      expect (201)
    })

    it ('02 - should authenticate a new user (login)', async () => {
      const resposta = await request (app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot'
      });
      token = resposta.body.token
      expect (200)  
    })
  
    it('03 - Must Create a post linked to some theme', async () => {
      const resposta = await request(app.getHttpServer())
        .post('/postagem')
        .send({
          titulo: 'Test',
          texto: 'imgr.com'
        });
      postagemId = resposta.body.id;
      expect(201)
    });

    it ('04 - should list all posting', async () => {
        await request(app.getHttpServer())
        .get('/postagem')
        .set('Authorization', `${token}`)
        .set({})
        expect (200)
      })    
    
})