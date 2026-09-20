<?php

namespace App\Filament\Resources\TravelGuides\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class TravelGuidesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')->circular()->label('Cover'),
                TextColumn::make('title')->weight('bold')->searchable()->sortable(),
                TextColumn::make('category')->badge()->color('primary'),
                TextColumn::make('read_time'),
                TextColumn::make('author'),
                ToggleColumn::make('is_featured')->label('Featured'),
                TextColumn::make('published_at')->date()->sortable(),
            ])
            ->defaultSort('published_at', 'desc')
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
