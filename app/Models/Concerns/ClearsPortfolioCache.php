<?php

namespace App\Models\Concerns;

use App\Support\PortfolioCache;

trait ClearsPortfolioCache
{
    public static function bootClearsPortfolioCache(): void
    {
        static::saved(function (): void {
            PortfolioCache::forget();
        });

        static::deleted(function (): void {
            PortfolioCache::forget();
        });
    }
}
