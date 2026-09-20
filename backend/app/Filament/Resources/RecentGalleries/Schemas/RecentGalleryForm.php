<?php

namespace App\Filament\Resources\RecentGalleries\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class RecentGalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('title')->label('Photo Title')->placeholder('e.g. Ama Dablam at First Light'),
                    Select::make('category')
                        ->options([
                            'Everest' => 'Everest & Khumbu',
                            'Annapurna' => 'Annapurna Region',
                            'Langtang' => 'Langtang Region',
                            'Culture' => 'Culture & Heritage',
                            'Expedition' => 'Peak Climbing & Expedition',
                        ])
                        ->default('Everest'),
                    TextInput::make('order')->numeric()->default(0),
                ]),

                TextInput::make('image_url')
                    ->label('Image URL')
                    ->placeholder('https://images.unsplash.com/photo-...')
                    ->required(),

                TextInput::make('caption')
                    ->label('Caption / Location Description')
                    ->placeholder('e.g. Dramatic knife-edge ridges bathed in morning alpenglow, Khumbu.'),

                Toggle::make('is_active')
                    ->label('Display in Gallery Carousel')
                    ->default(true),
            ]);
    }
}
