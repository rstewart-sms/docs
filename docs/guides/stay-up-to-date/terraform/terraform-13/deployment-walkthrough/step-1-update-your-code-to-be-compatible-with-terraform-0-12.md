---
sidebar_label: Update to Terraform 12
---

# Step 1: update your code to be compatible with Terraform 0.12

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.12. Do NOT skip from, say, 0.11, straight to 0.13. You MUST update to
    0.12.26 or above first! If you’re still on Terraform 0.11 or older, see our
    [Terraform 0.12 upgrade guide](../../terraform-12) for instructions.

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 0.13 versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"3a52849ba611d6006e2e631293d16822"}
##DOCS-SOURCER-END -->