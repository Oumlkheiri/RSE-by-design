import { 
    Thermometer, 
    Bug, 
    Recycle, 
    Droplet, 
    Zap, 
    Building2, 
    Cloud, 
    Globe, 
    Wheat,
    Newspaper,
    FlaskConical,
    Lightbulb,
    BarChart3,
    FileText,
    Scroll,
    Target,
    GraduationCap,
    Home,
    Sprout
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Filter categories for the articles page - RSE by Design
export const filterCategories = {
    theme: [
        'Climat & Réchauffement',
        'Biodiversité & Faune',
        'Recyclage & Déchets',
        'Préservation de l\'eau',
        'Énergie renouvelable',
        'Villes durables',
        'Pollution & Qualité de l\'air',
        'Technologie verte',
        'Agriculture & Alimentation'
    ],
    impactLevel: [
        'Débutant',
        'Actions du quotidien',
        'Recherche à fort impact',
        'Expert'
    ],
    contentType: [
        'Actualités',
        'Recherche scientifique',
        'Conseils & Guides',
        'Études de cas',
        'Rapports',
        'Législation / Politiques'
    ],
    dateRange: [
        'Dernier',
        'Cette semaine',
        'Ce mois-ci',
        'Cette année'
    ]
};

// Category icons mapping
export const categoryIcons: Record<string, LucideIcon> = {
    'Climat & Réchauffement': Thermometer,
    'Biodiversité & Faune': Bug,
    'Recyclage & Déchets': Recycle,
    'Préservation de l\'eau': Droplet,
    'Énergie renouvelable': Zap,
    'Villes durables': Building2,
    'Pollution & Qualité de l\'air': Cloud,
    'Technologie verte': Globe,
    'Agriculture & Alimentation': Wheat,
    'Climat': Thermometer
};

// Content type icons mapping
export const contentTypeIcons: Record<string, LucideIcon> = {
    'Actualités': Newspaper,
    'Recherche scientifique': FlaskConical,
    'Conseils & Guides': Lightbulb,
    'Études de cas': BarChart3,
    'Rapports': FileText,
    'Législation / Politiques': Scroll,
    'Article de presse': Newspaper,
    'Article de presse / site institutionnel': Newspaper,
    'Article scientifique': FlaskConical,
    'Article de synthèse': FileText,
    'Article de presse / vulgarisation': Newspaper,
    'Guide pratique': Lightbulb,
    'Étude de cas': BarChart3
};

// Impact level icons
export const impactIcons: Record<string, LucideIcon> = {
    'Débutant': Sprout,
    'Actions du quotidien': Home,
    'Recherche à fort impact': Target,
    'Expert': GraduationCap
};