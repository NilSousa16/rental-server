import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddFields1617630441248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'address',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'responsible_email',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'cnpj',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'responsible_name',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'phone',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'phone');

        await queryRunner.dropColumn('users', 'responsible_name');

        await queryRunner.dropColumn('users', 'cnpj');

        await queryRunner.dropColumn('users', 'email');

        await queryRunner.dropColumn('users', 'address');
    }

}
