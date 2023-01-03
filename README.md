New-AzResourceGroupDeployment -ResourceGroupName "IT" -TemplateFile ".\deploy\main.bicep" -TemplateParameterFile ".\deploy\parameters.json"
