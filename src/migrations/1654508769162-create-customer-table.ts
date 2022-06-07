/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner, Table, TableIndex, IsNull} from "typeorm";

export class createCustomerTable1654508769162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "email",
                    isUnique: true,
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "username",
                    isUnique: true,
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                
                
            ],
            
        }), true)


        await queryRunner.createTable(new Table({
            name: "Staff",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "email",
                    isUnique: true,
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "birth",
                    isUnique: true,
                    type: "date",
                },
                {
                    name: "Pnumber",
                    isUnique: true,
                    type: "varchar",
                },
                
                
            ],
            
        }), true)

        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    isUnique: true,
                    type: "varchar",
                },
                {
                    name: "image",
                    type: 'varchar',
                },
                {
                    name: "Description",
                    type: "varchar",
                },
                {
                    name: "Price",
                    type: "int"
                }
            ],
            
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.dropTable("users");
        await queryRunner.dropTable("Staff");
        // await queryRunner.dropTable("product");


    }

}
