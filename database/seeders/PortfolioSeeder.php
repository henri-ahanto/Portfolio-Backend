<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed the portfolio content.
     */
    public function run(): void
    {
        DB::transaction(function (): void {
            Profile::query()->delete();
            Profile::query()->create([
                'name' => 'AHANTO Henri Sylvain',
                'first_name' => 'Henri Sylvain',
                'last_name' => 'AHANTO',
                'handle' => 'henri-ahanto',
                'role' => 'Développeur Web Fullstack, Mobile & IA',
                'roles' => [
                    'Développeur Web Fullstack',
                    'Développeur Mobile',
                    'Développeur IA & Data',
                    'Architecte logiciel',
                ],
                'tagline' => 'Je conçois des applications robustes et évolutives, de l\'interface au déploiement — avec React, Laravel, PHP et Python.',
                'location' => 'Lokossa / Cotonou, Bénin',
                'email' => 'ahantohenrisylvain@gmail.com',
                'phones' => ['+229 01 53 46 58 49', '+229 01 44 08 14 98'],
                'availability' => 'Ouvert aux opportunités CDI, CDD & Freelance',
                'bio' => [
                    'Développeur web fullstack passionné, diplômé en Informatique et Télécommunications (INSTI, 2026) et actuellement en stage professionnel chez WaohDigital.',
                    'Fort d\'une expertise en conception logicielle, je conçois des applications robustes et évolutives. Mon profil polyvalent me permet d\'intervenir sur toutes les couches d\'un projet : frontend, backend, base de données et intelligence artificielle.',
                    'Toujours en veille, j\'explore l\'IA, le web scraping et la cybersécurité pour enrichir chaque projet et repousser les limites de ce que je construis.',
                ],
                'links' => [
                    'github' => 'https://github.com/henri-ahanto',
                    'youtube' => 'https://youtube.com/@digitallifeacademy911',
                    'portfolio' => 'https://ahantohenrisylvain.vercel.app',
                    'cv' => '/CV_AHANTO_Henri_Sylvain.pdf',
                ],
                'languages' => ['Français', 'Anglais', 'Fon', 'Adja'],
                'stats' => [
                    ['value' => 4, 'suffix' => '', 'label' => 'Projets réalisés'],
                    ['value' => 25, 'suffix' => '+', 'label' => 'Technologies maîtrisées'],
                    ['value' => 3, 'suffix' => '', 'label' => 'Stages effectués'],
                    ['value' => 3, 'suffix' => '', 'label' => 'Années d\'études à l\'INSTI'],
                ],
                'diplomas' => [
                    ['year' => '2023', 'title' => 'BAC série F3', 'place' => 'Lycée Technique de Lokossa'],
                    ['year' => '2023', 'title' => 'DT série F3', 'place' => 'Lycée Technique de Lokossa'],
                    ['year' => '2022', 'title' => 'CAP série F3', 'place' => 'Lycée Technique de Lokossa'],
                    ['year' => '2020', 'title' => 'BEPC', 'place' => 'Collège catholique de Lokossa'],
                    ['year' => '2016', 'title' => 'CEP', 'place' => 'EPP Julien QUENUM, Lokossa'],
                ],
            ]);

            Project::query()->delete();

            $projects = [
                [
                    'title' => 'Gestion des ventes',
                    'slug' => 'expense-app',
                    'description' => 'Application de gestion des ventes construite avec Laravel et React : une interface réactive et une API structurée pour piloter l\'activité au quotidien.',
                    'tags' => ['Laravel', 'React'],
                    'kind' => 'Application web',
                    'href' => 'https://github.com/henri-ahanto/expense-app',
                    'accent' => 'laravel',
                    'snippet' => '$ php artisan serve',
                ],
                [
                    'title' => 'Clone d\'Apple',
                    'slug' => 'appleSiteClone',
                    'description' => 'Reproduction de l\'expérience visuelle du site Apple en React : mise en page soignée, animations fluides et attention portée aux détails responsive.',
                    'tags' => ['React', 'Frontend'],
                    'kind' => 'Frontend',
                    'href' => 'https://github.com/henri-ahanto/appleSiteClone',
                    'accent' => 'python',
                    'snippet' => '<AppleHero />',
                ],
                [
                    'title' => 'Digital Life Academy',
                    'slug' => 'youtube',
                    'description' => 'Chaîne YouTube de formation en ligne : tutoriels et cours gratuits autour de l\'informatique et du développement logiciel, partagés avec la communauté.',
                    'tags' => ['YouTube', 'Pédagogie'],
                    'kind' => 'Formation',
                    'href' => 'https://youtube.com/@digitallifeacademy911',
                    'accent' => 'php',
                    'snippet' => '$ npm run teach',
                ],
                [
                    'title' => 'ERP DrachTravel',
                    'slug' => 'erp-drach',
                    'description' => 'Logiciel d\'assistance à la gestion d\'une entreprise de voyage : centralisation des informations, suivi des activités et accompagnement des équipes au quotidien.',
                    'tags' => ['ERP', 'Gestion', 'Sur mesure'],
                    'kind' => 'Projet privé',
                    'href' => null,
                    'accent' => 'yellow',
                    'snippet' => '$ erp:drach --sync',
                ],
            ];

            foreach ($projects as $index => $project) {
                Project::query()->create([...$project, 'sort_order' => $index]);
            }

            SkillCategory::query()->delete();

            $skillCategories = [
                [
                    'title' => 'Design',
                    'icon' => 'palette',
                    'accent' => 'php',
                    'skills' => ['Figma', 'Framer'],
                ],
                [
                    'title' => 'Langages de programmation',
                    'icon' => 'code',
                    'accent' => 'python',
                    'skills' => ['C++', 'PHP 8', 'JavaScript', 'TypeScript', 'Python 3', 'Java 21'],
                ],
                [
                    'title' => 'Frameworks',
                    'icon' => 'layers',
                    'accent' => 'laravel',
                    'skills' => ['Next.js', 'React 19', 'Django', 'Laravel 11-13', 'Flask', 'FastAPI'],
                ],
                [
                    'title' => 'IA / Data Science',
                    'icon' => 'brain',
                    'accent' => 'yellow',
                    'skills' => ['PyTorch', 'TensorFlow', 'BeautifulSoup', 'Selenium', 'Pandas'],
                ],
                [
                    'title' => 'Bases de données',
                    'icon' => 'database',
                    'accent' => 'python',
                    'skills' => ['MySQL 8', 'PostgreSQL 16', 'MongoDB'],
                ],
                [
                    'title' => 'Architecture logicielle',
                    'icon' => 'boxes',
                    'accent' => 'laravel',
                    'skills' => ['Clean Architecture', 'MVC', 'MVVM', 'Architecture Hexagonale'],
                ],
            ];

            foreach ($skillCategories as $index => $category) {
                SkillCategory::query()->create([...$category, 'sort_order' => $index]);
            }

            TimelineItem::query()->delete();

            $timeline = [
                [
                    'date' => 'Sept. 2026 — Aujourd\'hui',
                    'title' => 'Stage professionnel',
                    'place' => 'WaohDigital',
                    'description' => 'Stage professionnel chez WaohDigital, sur des projets de développement web.',
                    'type' => 'work',
                    'current' => true,
                ],
                [
                    'date' => 'Sept. 2025 — Août 2026',
                    'title' => 'Licence 3 — Informatique & Télécommunications',
                    'place' => 'INSTI, Lokossa',
                    'description' => 'Troisième année de licence en informatique et télécommunications.',
                    'type' => 'education',
                    'current' => false,
                ],
                [
                    'date' => 'Août — Sept. 2025',
                    'title' => 'Stage de fin de 2ᵉ année',
                    'place' => 'ICT-Consulting, Cotonou Godomey',
                    'description' => 'Stage en informatique et télécommunications.',
                    'type' => 'work',
                    'current' => false,
                ],
                [
                    'date' => '2024 — 2025',
                    'title' => 'Licence 2 — Informatique & Télécommunications',
                    'place' => 'INSTI, Lokossa',
                    'description' => null,
                    'type' => 'education',
                    'current' => false,
                ],
                [
                    'date' => 'Août — Sept. 2024',
                    'title' => 'Stage de fin de 1ʳᵉ année',
                    'place' => 'NTIC-Technologie, Lokossa',
                    'description' => null,
                    'type' => 'work',
                    'current' => false,
                ],
                [
                    'date' => '2023 — 2024',
                    'title' => 'Licence 1 — Informatique & Télécommunications',
                    'place' => 'INSTI, Lokossa',
                    'description' => null,
                    'type' => 'education',
                    'current' => false,
                ],
            ];

            foreach ($timeline as $index => $item) {
                TimelineItem::query()->create([...$item, 'sort_order' => $index]);
            }
        });
    }
}
