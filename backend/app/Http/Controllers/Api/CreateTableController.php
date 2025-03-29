<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class CreateTableController extends Controller
{
    public function createTable(Request $request)
{
    $request->validate([
        'table_name' => 'required|string',
        'columns' => 'required|array',
    ]);

    $tableName = $request->table_name;
    $columns = $request->columns;

    if (Schema::hasTable($tableName)) {
        return response()->json(['message' => 'Table already exists'], 400);
    }

    Schema::create($tableName, function (Blueprint $table) use ($columns) {
        $table->id();
        foreach ($columns as $column) {
            $type = $column['type'] ?? 'string';
            $name = $column['name'];

            if ($type === 'string') {
                $table->string($name);
            } elseif ($type === 'integer') {
                $table->integer($name);
            } elseif ($type === 'boolean') {
                $table->boolean($name);
            } elseif ($type === 'text') {
                $table->text($name);
            }
        }
        $table->timestamps();
    });

    Artisan::call("make:model " . ucfirst($tableName));

    $modelPath = app_path("Models/" . ucfirst($tableName) . ".php");
    $fillableFields = array_map(fn($col) => "'{$col['name']}'", $columns);
    $fillableString = implode(', ', $fillableFields);

    $modelContent = <<<PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$tableName} extends Model
{
    use HasFactory;

    protected \$fillable = [{$fillableString}];
}
PHP;

    File::put($modelPath, $modelContent);

    Artisan::call("make:controller Api/" . ucfirst($tableName) . "Controller --api --model=" . ucfirst($tableName));

    return response()->json(['message' => "Table $tableName, Model et Controller créés avec succès"]);
    }
}