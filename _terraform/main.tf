# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# SETUP AN S3 BUCKET FOR THE GRUNTWORK DOCS WEBSITE
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ---------------------------------------------------------------------------------------------------------------------
# CONFIGURE OUR AWS CONNECTION
# ---------------------------------------------------------------------------------------------------------------------

provider "aws" {
  # The AWS region in which all resources will be created
  region = "${var.aws_region}"

  # Only these AWS Account IDs may be operated on by this template
  allowed_account_ids = ["${var.aws_account_ids}"]
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE THE S3 BUCKET WHERE THE WEB FORM WILL BE HOSTED
# ---------------------------------------------------------------------------------------------------------------------

# We create an S3 bucket where our static web form files (e.g. HTML, CSS, JS) will be stored.
resource "aws_s3_bucket" "webform" {
  bucket = "${var.website_domain_name}"
  acl    = "public-read"

  # Define an S3 bucket policy that grants everyone access to all S3 objects. This way, we don't have to specify an Access
  # Control List (ACL) for each individual S3 object to allow it to be readable by the public.
  policy = <<-EOF
    {
        "Version":"2012-10-17",
        "Statement":[{
            "Sid":"PublicReadGetObject",
            "Effect":"Allow",
            "Principal": "*",
            "Action":["s3:GetObject"],
            "Resource":["arn:aws:s3:::${var.website_domain_name}/*"]
        }]
    }
    EOF

  # Configure S3 Static Website Hosting options
  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  # Saving every version of every file isn't necessary
  versioning {
    enabled = false
  }
}