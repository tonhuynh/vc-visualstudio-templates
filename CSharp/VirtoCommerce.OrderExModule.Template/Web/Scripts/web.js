﻿//Call this to register our module to main application
var moduleTemplateName = "$ext_safeprojectnamecamel$";

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
    .run(['virtoCommerce.orderModule.knownOperations', '$templateRequest', '$compile',
        function (knownOperations, $templateRequest, $compile) {
            var foundTemplate = knownOperations.getOperation('CustomerOrder');
            if (foundTemplate) {
                foundTemplate.detailBlade.metaFields.push(
                    {
                        name: 'newField',
                        title: "New field",
                        valueType: "ShortText"
                    });

                foundTemplate.detailBlade.knownChildrenOperations.push('Invoice');
            }

            var invoiceOperation = {
                type: 'Invoice',
                description: 'Sample Invoice document',
                treeTemplateUrl: 'invoiceOperation.tpl.html',
                detailBlade: {
                    template: 'Modules/$($ext_safeprojectnamecamel$)/Scripts/blades/invoice-detail.tpl.html',
                    metaFields: [
                        {
                            name: 'number',
                            isRequired: true,
                            title: "Invoice number",
                            valueType: "ShortText"
                        },
                        {
                            name: 'createdDate',
                            isReadonly: true,
                            title: "created",
                            valueType: "DateTime"
                        },
                        {
                            name: 'customerId',
                            title: "Customer",
                            templateUrl: 'customerSelector.html'
                        }
                    ]
                }
            };
            knownOperations.registerOperation(invoiceOperation);

            $templateRequest('Modules/$($ext_safeprojectnamecamel$)/Scripts/tree-template.html').then(function (response) {
                // compile the response, which will put stuff into the cache
                var template = angular.element(response);
                $compile(template);
            });
        }]);
