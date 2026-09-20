<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Destination;
use App\Models\HomepageSection;
use App\Models\Inquiry;
use App\Models\Itinerary;
use App\Models\Package;
use App\Models\PackageDeparture;
use App\Models\PackageFaq;
use App\Models\PackageInclusion;
use App\Models\RecentGallery;
use App\Models\Review;
use App\Models\TeamMember;
use App\Models\TravelGuide;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@ecosummitnepal.com'],
            [
                'name' => 'EcoSummit Administrator',
                'password' => Hash::make('EcoSummit@2026!'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Homepage Sections
        $sections = [
            [
                'section_key' => 'hero',
                'badge' => "NEPAL'S PREMIER EXPEDITION COLLECTIVE",
                'headline' => 'Private Himalayan Treks, Cultural Journeys & Expeditions in Nepal',
                'subheadline' => 'Handcrafted private expeditions led by native Sherpa masters. Small footprint, world-class safety, and bespoke luxury pacing.',
                'description' => 'Experience the high Himalayas with native expertise and personalized itineraries.',
                'cta_text' => 'Explore Journeys',
                'cta_link' => '/treks',
                'media_items' => [
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop',
                ],
            ],
            [
                'section_key' => 'featured_journeys',
                'badge' => 'HANDPICKED EXPEDITIONS',
                'headline' => 'FEATURED JOURNEYS',
                'subheadline' => 'Handpicked Adventures for Unforgettable Memories',
                'description' => 'From the hallowed base camps of 8,000-meter giants to pristine rhododendron forests and sacred glacial sanctuaries, explore our most revered itineraries.',
                'cta_text' => 'View All Treks',
                'cta_link' => '/treks',
            ],
            [
                'section_key' => 'explore_categories',
                'badge' => 'TAILORED EXPEDITION STYLES',
                'headline' => 'EXPLORE CATEGORIES',
                'subheadline' => 'Discover Your Perfect Travel Experience',
                'description' => 'Whether you seek heart-pounding summit climbs, serene teahouse treks, or lavish helicopter safaris, choose the style crafted for your ambitions.',
                'cta_text' => 'Explore Styles',
                'cta_link' => '/treks',
            ],
            [
                'section_key' => 'featured_destinations',
                'badge' => 'SACRED HIMALAYAN REALMS',
                'headline' => 'FEATURED DESTINATIONS',
                'subheadline' => 'Unforgettable Experiences Across Nepal',
                'description' => 'Journey through ancient mountain kingdoms, high alpine passes, and hidden biodiversity havens preserved across the roof of the world.',
                'cta_text' => 'All Destinations',
                'cta_link' => '/destinations',
            ],
            [
                'section_key' => 'grounded_leadership',
                'badge' => '100% NATIVE HIGH-ALTITUDE EXPERTISE',
                'headline' => 'Grounded Leadership',
                'subheadline' => 'Meet Your Local Himalayan Experts',
                'description' => 'Every expedition is led by seasoned native Sherpas and certified Wilderness First Responders with over 15+ years on the high trails.',
                'cta_text' => 'About Our Sherpa Team',
                'cta_link' => '/about',
            ],
            [
                'section_key' => 'recent_gallery',
                'badge' => 'VISUAL CHRONICLES',
                'headline' => 'Recent Gallery',
                'subheadline' => 'Moments Captured on the High Ridge',
                'description' => 'Real vistas captured by our guides and travelers across the trails of Khumbu, Annapurna, Manaslu, and beyond.',
                'cta_text' => 'Follow on Instagram',
                'cta_link' => 'https://instagram.com',
            ],
            [
                'section_key' => 'testimonials',
                'badge' => 'TRAVELER VOICES',
                'headline' => 'Client Testimonials',
                'subheadline' => 'Real Stories From the High Trails',
                'description' => 'Read first-hand reflections from explorers who have trusted EcoSummit with their bucket-list Himalayan journeys.',
                'cta_text' => 'Read All Reviews',
                'cta_link' => '/about',
            ],
            [
                'section_key' => 'travel_guide',
                'badge' => 'HIMALAYAN KNOWLEDGE BASE',
                'headline' => 'The Nepal Travel Guide',
                'subheadline' => 'Field Notes, Gear Advice & Altitude Protocols',
                'description' => 'Expert packing tips, acclimatization science, and cultural etiquette to prepare you for the adventure of a lifetime.',
                'cta_text' => 'Explore Articles',
                'cta_link' => '/plan-your-trip',
            ],
        ];

        foreach ($sections as $sec) {
            HomepageSection::updateOrCreate(['section_key' => $sec['section_key']], $sec);
        }

        // 3. Seed Team Members (Grounded Leadership)
        $team = [
            [
                'name' => 'Pasang Nuru Sherpa',
                'role' => 'Lead Expedition Director & UIAGM Guide',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
                'experience_years' => 18,
                'summits_count' => '9x Everest Summitteer',
                'bio' => 'Born in Pangboche under the shadow of Ama Dablam, Pasang has guided high-altitude giants for nearly two decades with zero safety incidents.',
                'speciality' => 'High-Altitude Logistics & Glacial Safety',
                'order' => 1,
            ],
            [
                'name' => 'Dawa Yangzum Sherpa',
                'role' => 'Senior Mountain Guide & Wilderness Medic',
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
                'experience_years' => 12,
                'summits_count' => '4x Everest, 2x Manaslu Summitteer',
                'bio' => 'Pioneer woman climber and certified WFR instructor, championing ethical mountain guiding and female mountaineer empowerment.',
                'speciality' => 'Wilderness First Response & Technical Climbing',
                'order' => 2,
            ],
            [
                'name' => 'Tenzing Norbu',
                'role' => 'Senior Cultural & Trekking Specialist',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
                'experience_years' => 16,
                'summits_count' => 'Mera Peak, Island Peak, Chulu West',
                'bio' => 'Deeply versed in Tibetan Buddhist iconography, monastery rituals, and sacred pilgrimage routes across Mustang and Manaslu.',
                'speciality' => 'Cultural Interpretation & High Passes',
                'order' => 3,
            ],
            [
                'name' => 'Ang Dorjee Sherpa',
                'role' => 'Logistics Chief & Base Camp Director',
                'photo' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
                'experience_years' => 14,
                'summits_count' => 'Kala Patthar, Thorong La, Larkya La Specialist',
                'bio' => 'Master of high-altitude teahouse relationships, satellite communications, and precision heli evacuation management.',
                'speciality' => 'Himalayan Supply Chain & Heli Protocols',
                'order' => 4,
            ],
        ];

        foreach ($team as $m) {
            TeamMember::updateOrCreate(['name' => $m['name']], $m);
        }

        // 4. Seed Recent Gallery
        $galleries = [
            [
                'title' => 'Ama Dablam at First Light',
                'caption' => 'Dramatic knife-edge ridges bathed in morning alpenglow, Khumbu.',
                'image_url' => 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Everest',
                'order' => 1,
            ],
            [
                'title' => 'Gokyo Cobalt Lake',
                'caption' => 'Turquoise glacial waters reflecting Cho Oyu in the upper Gokyo valley.',
                'image_url' => 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Everest',
                'order' => 2,
            ],
            [
                'title' => 'Annapurna South Alpenglow',
                'caption' => 'Towering granite ramparts caught in sunset hues from ABC sanctuary.',
                'image_url' => 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Annapurna',
                'order' => 3,
            ],
            [
                'title' => 'Lo Manthang Walled City',
                'caption' => 'Centuries-old Tibetan mud-brick ramparts under the Mustang sun.',
                'image_url' => 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Culture',
                'order' => 4,
            ],
            [
                'title' => 'Langtang Lirung Glacier',
                'caption' => 'Hanging seracs and alpine meadows in upper Kyanjin Gompa.',
                'image_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Langtang',
                'order' => 5,
            ],
            [
                'title' => 'Mera Peak Summit Panorama',
                'caption' => 'Unbroken views of five 8,000m giants from the 6,476m summit plateau.',
                'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'category' => 'Expedition',
                'order' => 6,
            ],
        ];

        foreach ($galleries as $g) {
            RecentGallery::updateOrCreate(['image_url' => $g['image_url']], $g);
        }

        // 5. Seed Travel Guides (The Nepal Travel Guide)
        $guides = [
            [
                'title' => 'How to Train & Acclimatize for Everest Base Camp (5,545m)',
                'slug' => 'how-to-train-acclimatize-everest-base-camp',
                'category' => 'Altitude & Health',
                'excerpt' => 'A medical and Sherpa-tested guide to hydration, pulse oximetry, and cardiovascular preparation for high-altitude trekking.',
                'content' => "High altitude trekking demands preparation, respect for physiological limits, and careful pacing. Learn why the rule of 'climb high, sleep low' is central to EcoSummit safety standards.",
                'cover_image' => 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
                'read_time' => '7 min read',
                'author' => 'Dr. Lhakpa Sherpa & EcoSummit Medical Council',
                'tag' => 'Altitude Safety',
                'is_featured' => true,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Packing Essentials for Autumn & Spring Treks in the Himalayas',
                'slug' => 'packing-essentials-autumn-spring-himalayas',
                'category' => 'Gear & Equipment',
                'excerpt' => 'Layering systems, sleeping bag ratings, footwear breakdown, and what to leave behind in Kathmandu.',
                'content' => 'Layering is the cornerstone of comfortable alpine travel in Nepal. A three-layer system comprising merino base layer, active fleece mid-layer, and waterproof breathable shell ensures adaptability across temperatures from 25°C to -15°C.',
                'cover_image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'read_time' => '6 min read',
                'author' => 'Pasang Nuru Sherpa',
                'tag' => 'Gear Guide',
                'is_featured' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Upper Mustang: Cultural Etiquette in the Walled Kingdom',
                'slug' => 'upper-mustang-cultural-etiquette-walled-kingdom',
                'category' => 'Culture & Ethics',
                'excerpt' => 'Navigating century-old gompas, chortens, and sacred mani walls with dignity and cultural mindfulness.',
                'content' => 'Always walk clockwise around mani walls, chortens, and temples. When photographing local elders or monastery interiors, always ask permission and consider making a direct donation to the monastery preservation fund.',
                'cover_image' => 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop',
                'read_time' => '5 min read',
                'author' => 'Tenzing Norbu',
                'tag' => 'Heritage',
                'is_featured' => false,
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($guides as $gu) {
            TravelGuide::updateOrCreate(['slug' => $gu['slug']], $gu);
        }

        // 6. Import seed data file (packages, reviews, destinations)
        $seedFile = __DIR__ . '/packages_seed.json';
        if (file_exists($seedFile)) {
            $data = json_decode(file_get_contents($seedFile), true);

            // Seed Destinations
            if (!empty($data['destinations'])) {
                foreach ($data['destinations'] as $dest) {
                    $slug = $dest['slug'] ?? Str::slug($dest['name']);
                    $country = in_array($slug, ['bhutan', 'tibet', 'india']) ? ucfirst($slug) : 'Nepal';
                    $tier = $country === 'Nepal' ? 'homeland' : 'cross-border';

                    Destination::updateOrCreate(
                        ['slug' => $slug],
                        [
                            'name' => $dest['name'],
                            'country' => $country,
                            'tier' => $tier,
                            'subtitle' => $dest['subtitle'] ?? null,
                            'description' => $dest['description'] ?? null,
                            'image' => $dest['image'] ?? null,
                            'best_season' => $dest['bestSeason'] ?? 'March–May & Sept–Nov',
                            'journey_count' => $dest['journeyCount'] ?? 5,
                            'highlights' => $dest['highlights'] ?? [],
                            'gallery' => $dest['gallery'] ?? [],
                            'starting_price' => $dest['startingPrice'] ?? '$1,200',
                            'is_featured' => true,
                        ]
                    );
                }
            }

            // Seed Reviews
            if (!empty($data['reviews'])) {
                foreach ($data['reviews'] as $rev) {
                    Review::updateOrCreate(
                        ['comment' => $rev['comment'] ?? $rev['content'] ?? ''],
                        [
                            'author_name' => $rev['author'] ?? $rev['author_name'] ?? 'Traveler',
                            'author_country' => $rev['country'] ?? 'United Kingdom',
                            'author_avatar' => $rev['avatar'] ?? null,
                            'rating' => $rev['rating'] ?? 5.0,
                            'trek_name' => $rev['trekDate'] ?? $rev['trek_name'] ?? 'Everest Base Camp',
                            'title' => $rev['title'] ?? null,
                            'comment' => $rev['comment'] ?? $rev['content'] ?? '',
                            'review_date' => $rev['date'] ?? 'October 2025',
                            'is_verified' => true,
                            'is_featured' => true,
                        ]
                    );
                }
            }

            // Seed Packages (Treks, Tours, Expeditions)
            $packageCollections = [
                'treks' => $data['treks'] ?? [],
                'tours' => $data['tours'] ?? [],
                'expeditions' => $data['expeditions'] ?? [],
            ];

            foreach ($packageCollections as $type => $pkgList) {
                foreach ($pkgList as $index => $item) {
                    $slug = $item['slug'];
                    $priceStr = $item['startingPrice'] ?? null;
                    $numericPrice = null;
                    if ($priceStr) {
                        $numericPrice = floatval(preg_replace('/[^0-9.]/', '', $priceStr));
                    }

                    $durationDays = 1;
                    if (!empty($item['duration'])) {
                        preg_match('/\d+/', $item['duration'], $m);
                        if (!empty($m[0])) {
                            $durationDays = intval($m[0]);
                        }
                    }

                    $package = Package::updateOrCreate(
                        ['slug' => $slug],
                        [
                            'title' => $item['title'],
                            'category' => $item['category'] ?? ($type === 'treks' ? 'trek' : ($type === 'tours' ? 'tour' : 'expedition')),
                            'region' => $item['region'] ?? null,
                            'activity' => $item['activity'] ?? null,
                            'duration' => $item['duration'] ?? null,
                            'duration_days' => $durationDays,
                            'difficulty' => $item['difficulty'] ?? 'Moderate',
                            'max_altitude' => $item['maxAltitude'] ?? null,
                            'best_season' => $item['bestSeason'] ?? null,
                            'group_size' => $item['groupSize'] ?? 'Private or Small Group',
                            'starting_price' => $priceStr,
                            'price_numeric' => $numericPrice,
                            'short_description' => $item['shortDescription'] ?? null,
                            'overview' => $item['overview'] ?? null,
                            'highlights' => $item['highlights'] ?? [],
                            'featured_image' => $item['featuredImage'] ?? null,
                            'gallery' => $item['gallery'] ?? [],
                            'route_map_image' => $item['routeMapImage'] ?? null,
                            'video_id' => $item['videoId'] ?? null,
                            'transportation' => $item['transportation'] ?? null,
                            'start_end_point' => $item['startEndPoint'] ?? null,
                            'accommodation_type' => $item['accommodationType'] ?? null,
                            'acclimatisation_plan' => $item['acclimatisationPlan'] ?? null,
                            'is_featured' => $index < 3,
                            'order' => $index + 1,
                        ]
                    );

                    // Seed Day-by-Day Itineraries
                    if (!empty($item['itinerary'])) {
                        $package->itineraries()->delete();
                        foreach ($item['itinerary'] as $it) {
                            Itinerary::create([
                                'package_id' => $package->id,
                                'day' => $it['day'],
                                'title' => $it['title'],
                                'altitude' => $it['altitude'] ?? null,
                                'duration' => $it['duration'] ?? null,
                                'description' => $it['description'] ?? null,
                                'accommodation' => $it['accommodation'] ?? null,
                                'meals' => $it['meals'] ?? null,
                                'order' => $it['day'],
                            ]);
                        }
                    }

                    // Seed Inclusions & Exclusions
                    $package->allInclusions()->delete();
                    if (!empty($item['inclusions'])) {
                        foreach ($item['inclusions'] as $incIdx => $incItem) {
                            PackageInclusion::create([
                                'package_id' => $package->id,
                                'type' => 'include',
                                'item' => $incItem,
                                'order' => $incIdx + 1,
                            ]);
                        }
                    }
                    if (!empty($item['exclusions'])) {
                        foreach ($item['exclusions'] as $excIdx => $excItem) {
                            PackageInclusion::create([
                                'package_id' => $package->id,
                                'type' => 'exclude',
                                'item' => $excItem,
                                'order' => $excIdx + 1,
                            ]);
                        }
                    }

                    // Seed FAQs
                    if (!empty($item['faqs'])) {
                        $package->faqs()->delete();
                        foreach ($item['faqs'] as $faqIdx => $faqItem) {
                            PackageFaq::create([
                                'package_id' => $package->id,
                                'question' => $faqItem['question'],
                                'answer' => $faqItem['answer'],
                                'order' => $faqIdx + 1,
                            ]);
                        }
                    }

                    // Seed Sample Upcoming Departures
                    $package->departures()->delete();
                    PackageDeparture::create([
                        'package_id' => $package->id,
                        'start_date' => now()->addDays(20 + $index * 5)->format('Y-m-d'),
                        'end_date' => now()->addDays(20 + $index * 5 + $durationDays)->format('Y-m-d'),
                        'price' => $priceStr ?: '$1,890',
                        'status' => 'Guaranteed',
                        'seats_left' => 6,
                    ]);
                    PackageDeparture::create([
                        'package_id' => $package->id,
                        'start_date' => now()->addDays(50 + $index * 5)->format('Y-m-d'),
                        'end_date' => now()->addDays(50 + $index * 5 + $durationDays)->format('Y-m-d'),
                        'price' => $priceStr ?: '$1,890',
                        'status' => 'Available',
                        'seats_left' => 10,
                    ]);
                }
            }
        }

        // 7. Seed Sample Bookings and Inquiries so admin sees real dashboard data immediately!
        $firstTrek = Package::first();
        if ($firstTrek) {
            Booking::updateOrCreate(
                ['booking_code' => 'ECO-849201'],
                [
                    'package_id' => $firstTrek->id,
                    'package_title' => $firstTrek->title,
                    'package_slug' => $firstTrek->slug,
                    'full_name' => 'Alexander von Wright',
                    'email' => 'alex.wright@alpinist.ch',
                    'phone' => '+41 79 123 4567',
                    'country' => 'Switzerland',
                    'departure_date' => now()->addDays(25)->format('Y-m-d'),
                    'travelers_count' => 2,
                    'room_preference' => 'Double / Twin Private Room with Attached Bath',
                    'dietary_requirements' => 'Vegetarian, Gluten-Free',
                    'emergency_contact' => 'Elena Wright (+41 79 987 6543)',
                    'special_requests' => 'Private Sherpa guide, acclimatization pulse oximeter monitoring each morning and evening.',
                    'status' => 'confirmed',
                    'payment_status' => 'deposit_paid',
                    'total_amount' => '$3,780',
                    'internal_notes' => 'Experienced hikers, completed Mont Blanc circuit last season. Requested Pasang Nuru if available.',
                ]
            );

            Booking::updateOrCreate(
                ['booking_code' => 'ECO-391820'],
                [
                    'package_id' => $firstTrek->id,
                    'package_title' => $firstTrek->title,
                    'package_slug' => $firstTrek->slug,
                    'full_name' => 'Dr. Claire Montgomery',
                    'email' => 'claire.m@edinburgh.ac.uk',
                    'phone' => '+44 7700 900123',
                    'country' => 'United Kingdom',
                    'departure_date' => now()->addDays(40)->format('Y-m-d'),
                    'travelers_count' => 1,
                    'room_preference' => 'Single Private Room',
                    'dietary_requirements' => 'None',
                    'emergency_contact' => 'Robert Montgomery (+44 7700 900456)',
                    'special_requests' => 'Keen on photography, would love to stop for Golden Hour near Tengboche.',
                    'status' => 'new',
                    'payment_status' => 'pending',
                    'total_amount' => '$1,890',
                ]
            );

            Inquiry::updateOrCreate(
                ['email' => 'marcus.lindqvist@stockholm.se'],
                [
                    'type' => 'plan_custom_trip',
                    'full_name' => 'Marcus Lindqvist',
                    'email' => 'marcus.lindqvist@stockholm.se',
                    'phone' => '+46 8 123 4567',
                    'country' => 'Sweden',
                    'destination' => 'Everest & Gokyo High Passes',
                    'package_id' => $firstTrek->id,
                    'preferred_date' => 'October 2026',
                    'duration_days' => '16–18 Days',
                    'group_size' => '3 Adults',
                    'budget_range' => '$3,000 – $4,500 per person',
                    'travel_style' => 'Luxury Teahouse + Heli Return',
                    'interests' => ['Gokyo Cobalt Lakes', 'Renjo La Pass', 'Helicopter Return to Kathmandu'],
                    'message' => 'Looking to combine Gokyo Ri sunrise with Cho La Pass and private helicopter transfer from Gorak Shep directly back to Kathmandu.',
                    'status' => 'new',
                ]
            );

            Inquiry::updateOrCreate(
                ['email' => 'sarah.jenkins@sydney.com.au'],
                [
                    'type' => 'general',
                    'full_name' => 'Sarah Jenkins',
                    'email' => 'sarah.jenkins@sydney.com.au',
                    'phone' => '+61 2 9876 5432',
                    'country' => 'Australia',
                    'message' => 'Hello! We are planning a family trip to Nepal with two teenagers (15 & 17). Which trek would be best between Poon Hill and Langtang Valley for beginners?',
                    'status' => 'contacted',
                    'internal_notes' => 'Advised Ghorepani Poon Hill + Chitwan luxury safari combo. Sent brochure via email.',
                ]
            );
        }
    }
}
