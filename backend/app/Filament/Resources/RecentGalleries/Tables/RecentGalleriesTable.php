<?php

namespace App\Filament\Resources\RecentGalleries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class RecentGalleriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_url')->label('Preview')->square(),
                TextColumn::make('title')->weight('bold')->searchable(),
                TextColumn::make('category')->badge()->color('primary'),
                TextColumn::make('caption')->limit(40),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('order')->sortable(),
            ])
            ->defaultSort('order', 'asc')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
