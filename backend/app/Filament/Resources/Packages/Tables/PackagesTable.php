<?php

namespace App\Filament\Resources\Packages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PackagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('featured_image')
                    ->label('Photo')
                    ->circular(),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn ($record): string => (string) $record->region),
                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'trek' => 'success',
                        'tour' => 'warning',
                        'expedition' => 'danger',
                        'peak_climbing' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'peak_climbing' => 'Peak Climbing (<7k)',
                        'expedition' => 'Expedition (>7k)',
                        'trek' => 'Trek',
                        'tour' => 'Tour',
                        default => ucfirst($state),
                    }),
                TextColumn::make('duration')
                    ->sortable(),
                TextColumn::make('starting_price')
                    ->label('Price')
                    ->sortable(),
                TextColumn::make('difficulty')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Easy' => 'info',
                        'Moderate' => 'primary',
                        'Challenging' => 'warning',
                        'Strenuous', 'Technical' => 'danger',
                        default => 'gray',
                    }),
                ToggleColumn::make('is_featured')
                    ->label('Featured'),
                TextColumn::make('order')
                    ->sortable(),
            ])
            ->defaultSort('order', 'asc')
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'trek' => 'Trekking',
                        'tour' => 'Tours',
                        'expedition' => 'Expeditions (Above 7,000m)',
                        'peak_climbing' => 'Peak Climbing (Below 7,000m)',
                    ]),
                SelectFilter::make('difficulty')
                    ->options([
                        'Easy' => 'Easy',
                        'Moderate' => 'Moderate',
                        'Challenging' => 'Challenging',
                        'Strenuous' => 'Strenuous',
                        'Technical' => 'Technical',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
