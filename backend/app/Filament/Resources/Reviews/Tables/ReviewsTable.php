<?php

namespace App\Filament\Resources\Reviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('author_avatar')->circular()->label('Photo'),
                TextColumn::make('author_name')->weight('bold')->searchable()->sortable(),
                TextColumn::make('author_country')->searchable(),
                TextColumn::make('rating')->badge()->color('warning')->sortable(),
                TextColumn::make('trek_name')->limit(30),
                ToggleColumn::make('is_featured')->label('Featured'),
                ToggleColumn::make('is_verified')->label('Verified'),
            ])
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
