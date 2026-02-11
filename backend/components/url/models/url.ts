import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.ts';

export class Url extends Model {
    declare id: string;
    declare shortCode: string;
    declare originalUrl: string;
    declare createdAt: Date;
}

Url.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        shortCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            field: 'short_code',
        },
        originalUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'original_url',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
    },
    {
        sequelize,
        tableName: 'urls',
        timestamps: false,
        underscored: true,
    }
);

export class UrlClick extends Model {
    declare id: string;
    declare urlId: string;
    declare clickedAt: Date;
}

UrlClick.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        urlId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'url_id',
        },
        clickedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'clicked_at',
        },
    },
    {
        sequelize,
        tableName: 'url_clicks',
        timestamps: false,
        underscored: true,
    }
);

Url.hasMany(UrlClick, { foreignKey: 'urlId', as: 'clicks' });
UrlClick.belongsTo(Url, { foreignKey: 'urlId', as: 'url' });

export default { Url, UrlClick };
