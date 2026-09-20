<?php

namespace App\Filament\Resources\TravelGuides;

use App\Filament\Resources\TravelGuides\Pages\CreateTravelGuide;
use App\Filament\Resources\TravelGuides\Pages\EditTravelGuide;
use App\Filament\Resources\TravelGuides\Pages\ListTravelGuides;
use App\Filament\Resources\TravelGuides\Schemas\TravelGuideForm;
use App\Filament\Resources\TravelGuides\Tables\TravelGuidesTable;
use App\Models\TravelGuide;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TravelGuideResource extends Resource
{
    protected static ?string $model = TravelGuide::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBookOpen;

    protected static ?string $recordTitleAttribute = 'title';

    public static function getNavigationGroup(): ?string
    {
        return 'Site Content & CMS';
    }

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return TravelGuideForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TravelGuidesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTravelGuides::route('/'),
            'create' => CreateTravelGuide::route('/create'),
            'edit' => EditTravelGuide::route('/{record}/edit'),
        ];
    }
}
