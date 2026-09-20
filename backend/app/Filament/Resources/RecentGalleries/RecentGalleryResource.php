<?php

namespace App\Filament\Resources\RecentGalleries;

use App\Filament\Resources\RecentGalleries\Pages\CreateRecentGallery;
use App\Filament\Resources\RecentGalleries\Pages\EditRecentGallery;
use App\Filament\Resources\RecentGalleries\Pages\ListRecentGalleries;
use App\Filament\Resources\RecentGalleries\Schemas\RecentGalleryForm;
use App\Filament\Resources\RecentGalleries\Tables\RecentGalleriesTable;
use App\Models\RecentGallery;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RecentGalleryResource extends Resource
{
    protected static ?string $model = RecentGallery::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCamera;

    protected static ?string $recordTitleAttribute = 'title';

    public static function getNavigationGroup(): ?string
    {
        return 'Site Content & CMS';
    }

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return RecentGalleryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RecentGalleriesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListRecentGalleries::route('/'),
            'create' => CreateRecentGallery::route('/create'),
            'edit' => EditRecentGallery::route('/{record}/edit'),
        ];
    }
}
