/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner, Table, TableIndex, IsNull, TableForeignKeyOptions, TableForeignKey} from "typeorm";


export class createCustomerTable1654599984424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "User",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
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
                {
                    name: 'staffId',
                    isUnique: true,
                    type: 'int'
                },
                {
                    name: 'role',
                    type: 'varchar'
                }
                
                
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
                    generationStrategy: 'increment'
                },
                {
                    name: 'userId',
                    isUnique: true,
                    type: 'int'
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
            name: "Product",
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
                    name: 'type',
                    type: 'varchar'
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

        await queryRunner.createTable(new Table({
            name: "Bill",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'staffId',
                    type: 'int',
                },
                {
                    name: 'price',
                    type: 'int'
                },
                {
                    name: 'Createdate',
                    type: "date",
                },
            ],
            
        }), true)

        await queryRunner.createTable(new Table({
            name: "Bill_Detail",
            columns: [
                {
                    name: 'billId',
                    type: 'int',
                    
                },
                {
                    name: 'productId',
                    type: 'int',
                },
                {
                    name: 'amount',
                    type: "int",
                },
            ],
            
        }), true)

        await queryRunner.createForeignKey(
            "Staff",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["staffId"],
                referencedTableName: "User",
                onDelete: "CASCADE",
            })
        ) 
        
        await queryRunner.createForeignKey(
            "Bill",
            new TableForeignKey({
                columnNames: ["staffId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Staff",
                onDelete: "NO ACTION",
            })
        )

        await queryRunner.createForeignKey(
            "Bill_Detail",
            new TableForeignKey({
                columnNames: ["billId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Bill",
                onDelete: "NO ACTION",
            })
        )

        await queryRunner.createForeignKey(
            "Bill_Detail",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "Product",
                onDelete: "NO ACTION",
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.dropTable("users");
        // await queryRunner.dropTable("staff");
        // await queryRunner.dropTable("product");
        // await queryRunner.dropTable("bill");
    }


}
