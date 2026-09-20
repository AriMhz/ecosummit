<?php

namespace App\Filament\Resources\Packages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class PackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Package Details')
                    ->tabs([
                        Tabs\Tab::make('General & Pricing')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('title')
                                        ->required()
                                        ->maxLength(255)
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                                    TextInput::make('slug')
                                        ->required()
                                        ->unique(ignoreRecord: true),
                                    Select::make('category')
                                        ->required()
                                        ->options([
                                            'trek' => 'Trek (Hiking & Teahouse)',
                                            'tour' => 'Tour (Cultural / Safari / Scenic)',
                                            'expedition' => 'Expedition (Above 7,000m & 8,000m Giants)',
                                            'peak_climbing' => 'Peak Climbing (Below 7,000m Trekking Peaks)',
                                        ])
                                        ->default('trek'),
                                ]),

                                Grid::make(4)->schema([
                                    TextInput::make('region')
                                        ->placeholder('e.g. Everest / Khumbu, Annapurna')
                                        ->required(),
                                    Select::make('difficulty')
                                        ->options([
                                            'Easy' => 'Easy',
                                            'Moderate' => 'Moderate',
                                            'Challenging' => 'Challenging',
                                            'Strenuous' => 'Strenuous',
                                            'Technical' => 'Technical Extreme',
                                        ])
                                        ->default('Moderate'),
                                    TextInput::make('duration')
                                        ->placeholder('e.g. 14 Days')
                                        ->required(),
                                    TextInput::make('duration_days')
                                        ->numeric()
                                        ->default(14),
                                ]),

                                Grid::make(4)->schema([
                                    TextInput::make('max_altitude')
                                        ->placeholder('e.g. 5,545m / 18,192ft (Kala Patthar)'),
                                    TextInput::make('best_season')
                                        ->placeholder('e.g. March–May & October–December'),
                                    TextInput::make('starting_price')
                                        ->placeholder('e.g. $1,890')
                                        ->required(),
                                    TextInput::make('group_size')
                                        ->placeholder('e.g. 1–8 travellers')
                                        ->default('Private or Small Group (1–8 travellers)'),
                                ]),

                                Grid::make(3)->schema([
                                    TextInput::make('start_end_point')
                                        ->placeholder('e.g. Kathmandu to Lukla / Kathmandu'),
                                    TextInput::make('transportation')
                                        ->placeholder('e.g. Scenic flight to Lukla & private transfers'),
                                    TextInput::make('accommodation_type')
                                        ->placeholder('e.g. Mountain Teahouses & Heritage Hotels'),
                                ]),

                                Grid::make(2)->schema([
                                    Toggle::make('is_featured')
                                        ->label('Feature on Homepage')
                                        ->default(false),
                                    TextInput::make('order')
                                        ->numeric()
                                        ->default(0),
                                ]),
                            ]),

                        Tabs\Tab::make('Media & Gallery')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                TextInput::make('featured_image')
                                    ->label('Cover Photo URL')
                                    ->helperText('High-resolution photo URL for cards and banners.')
                                    ->required(),

                                TextInput::make('route_map_image')
                                    ->label('Route Map Image URL')
                                    ->placeholder('https://... or upload below'),

                                TextInput::make('video_id')
                                    ->label('YouTube Video ID or Link')
                                    ->placeholder('e.g. dQw4w9WgXcQ'),

                                TagsInput::make('gallery')
                                    ->label('Gallery Photo URLs')
                                    ->placeholder('Add image URL and press Enter')
                                    ->helperText('Paste high-resolution photo URLs for the interactive photo carousel.'),
                            ]),

                        Tabs\Tab::make('Overview & Highlights')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Textarea::make('short_description')
                                    ->rows(3)
                                    ->placeholder('Concise 1-2 sentence hook for search cards.'),
                                Textarea::make('overview')
                                    ->rows(8)
                                    ->placeholder('In-depth overview of the terrain, altitude progression, and cultural highlights.'),
                                TagsInput::make('highlights')
                                    ->placeholder('Type highlight and press Enter')
                                    ->helperText('Key trip highlights, e.g. "Sunrise over Everest from Kala Patthar", "Tengboche Monastery blessing".'),
                                Textarea::make('acclimatisation_plan')
                                    ->rows(3)
                                    ->placeholder('Medical and altitude protocols for this route.'),
                            ]),

                        Tabs\Tab::make('Day-by-Day Itinerary')
                            ->icon('heroicon-o-calendar')
                            ->schema([
                                Repeater::make('itineraries')
                                    ->relationship('itineraries')
                                    ->schema([
                                        Grid::make(4)->schema([
                                            TextInput::make('day')->numeric()->required()->label('Day #'),
                                            TextInput::make('title')->required()->label('Day Title'),
                                            TextInput::make('altitude')->label('Max Altitude (e.g. 3,440m)'),
                                            TextInput::make('duration')->label('Walking Duration (e.g. 5-6 hrs)'),
                                        ]),
                                        Grid::make(2)->schema([
                                            TextInput::make('accommodation')->label('Accommodation (e.g. Mountain Teahouse)'),
                                            TextInput::make('meals')->label('Meals Included (e.g. B, L, D)'),
                                        ]),
                                        Textarea::make('description')->rows(3)->label('Daily Route & Trail Description'),
                                    ])
                                    ->orderColumn('day')
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => isset($state['day']) ? "Day {$state['day']}: " . ($state['title'] ?? '') : null)
                                    ->defaultItems(0),
                            ]),

                        Tabs\Tab::make('Inclusions & Excludes')
                            ->icon('heroicon-o-check-circle')
                            ->schema([
                                Repeater::make('allInclusions')
                                    ->relationship('allInclusions')
                                    ->schema([
                                        Grid::make(3)->schema([
                                            Select::make('type')
                                                ->options([
                                                    'include' => 'Included (✓)',
                                                    'exclude' => 'Excluded (✗)',
                                                ])
                                                ->required(),
                                            TextInput::make('item')
                                                ->required()
                                                ->columnSpan(2),
                                        ]),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => ($state['type'] === 'include' ? '✓ ' : '✗ ') . ($state['item'] ?? ''))
                                    ->defaultItems(0),
                            ]),

                        Tabs\Tab::make('Upcoming Departures & Dates')
                            ->icon('heroicon-o-clock')
                            ->schema([
                                Repeater::make('departures')
                                    ->relationship('departures')
                                    ->schema([
                                        Grid::make(5)->schema([
                                            TextInput::make('start_date')->type('date')->required(),
                                            TextInput::make('end_date')->type('date')->required(),
                                            TextInput::make('price')->placeholder('$1,890')->required(),
                                            Select::make('status')
                                                ->options([
                                                    'Guaranteed' => 'Guaranteed Departure',
                                                    'Available' => 'Available',
                                                    'Few Spots Left' => 'Few Spots Left',
                                                    'Closed' => 'Sold Out / Closed',
                                                ])
                                                ->default('Available'),
                                            TextInput::make('seats_left')->numeric()->default(8),
                                        ]),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => isset($state['start_date']) ? "Departure: {$state['start_date']} ({$state['status']})" : null),
                            ]),

                        Tabs\Tab::make('FAQs')
                            ->icon('heroicon-o-question-mark-circle')
                            ->schema([
                                Repeater::make('faqs')
                                    ->relationship('faqs')
                                    ->schema([
                                        TextInput::make('question')->required()->label('Question'),
                                        Textarea::make('answer')->required()->rows(3)->label('Answer'),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['question'] ?? null),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
