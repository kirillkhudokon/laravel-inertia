<?php

return [
    /*
     * Automatically discover all classes that should be transformed.
     */
    'auto_discover_types' => [
        app_path('Data'),
    ],

    /*
     * The generated TypeScript files will be written to this path.
     */
    'output_file' => resource_path('js-react/types/generated.d.ts'),

    /*
     * Collectors are classes that will search for transformable classes.
     */
    'collectors' => [
        Spatie\TypeScriptTransformer\Collectors\DefaultCollector::class,
    ],

    /*
     * Transformers take PHP classes and transform them into TypeScript.
     */
    'transformers' => [
        Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer::class,
        Spatie\TypeScriptTransformer\Transformers\SpatieEnumTransformer::class,
    ],

    /*
     * Writers take transformed TypeScript and write it to a file.
     */
    'writer' => Spatie\TypeScriptTransformer\Writers\ModuleWriter::class,

    /*
     * Formatters will format the TypeScript output.
     */
    'formatter' => Spatie\TypeScriptTransformer\Formatters\PrettierFormatter::class,
];
