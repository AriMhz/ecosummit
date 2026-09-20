<?php

namespace App\Filament\Resources\RecentGalleries\Pages;

use App\Filament\Resources\RecentGalleries\RecentGalleryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRecentGalleries extends ListRecords
{
    protected static string $resource = RecentGalleryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
