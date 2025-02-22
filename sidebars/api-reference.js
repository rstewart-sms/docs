const sidebars = {
  referenceSidebar: [
    {
      type: "doc",
      id: "reference/intro",
    },
    {
      type: "ref",
      label: "Service APIs",
      id: "reference/services/intro/overview",
    },
    {
      type: "ref",
      label: "Module APIs",
      id: "reference/modules/stub",
    },
    {
      type: "ref",
      label: "Tools",
      id: "reference/tools/stub",
    },
  ],
  modulesSidebar: [{ type: "autogenerated", dirName: "reference/modules" }],
  servicesSidebar: [
    {
      Introduction: [
        "reference/services/intro/overview",
        "reference/services/intro/deploy-new-infrastructure",
        "reference/services/intro/make-changes-to-your-infrastructure",
        "reference/services/intro/create-your-own-service-catalog",
      ],
    },
    {
      type: "category",
      collapsible: false,
      label: "Service Catalog API",
      items: [
        {
          "App Orchestration": [
            {
              type: "autogenerated",
              dirName: "reference/services/app-orchestration",
            },
          ],
        },
        {
          "CI/CD Pipeline": [
            {
              type: "autogenerated",
              dirName: "reference/services/ci-cd-pipeline",
            },
          ],
        },
        {
          "Data Storage": [
            {
              type: "autogenerated",
              dirName: "reference/services/data-storage",
            },
          ],
        },
        {
          "Landing Zone": [
            {
              type: "autogenerated",
              dirName: "reference/services/landing-zone",
            },
          ],
        },
        {
          Networking: [
            { type: "autogenerated", dirName: "reference/services/networking" },
          ],
        },
        {
          Security: [
            { type: "autogenerated", dirName: "reference/services/security" },
          ],
        },
      ],
    },
  ],
  toolsSidebar: [{ type: "autogenerated", dirName: "reference/tools" }],
}

module.exports = sidebars
