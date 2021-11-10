<div class="sect1">
<h2 id="_intro"><a class="anchor" href="#_intro"></a><a class="link" href="#_intro">Intro</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>This is Gruntwork&#8217;s style guide for Terraform. It aims to help us ensure that the code we write is
clear, readable, idiomatic Terraform code. The conventions detailed in this guide are our preferences and should be
thought of as guidelines rather than hard rules.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_starting_point"><a class="anchor" href="#_starting_point"></a><a class="link" href="#_starting_point">Starting point</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>We follow <a href="https://www.terraform.io/docs/configuration/style.html">the official HashiCorp style guide</a> for Terraform.</p>
</div>
<div class="paragraph">
<p>All of these are enforced using <code>terraform fmt</code>. All Gruntwork Terraform repos should enforce this using pre-commit
hooks; please add if missing.</p>
</div>
<div class="paragraph">
<p>On top of the official guide, Gruntwork follows some additional conventions.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_additional_conventions"><a class="anchor" href="#_additional_conventions"></a><a class="link" href="#_additional_conventions">Additional conventions</a></h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_general"><a class="anchor" href="#_general"></a><a class="link" href="#_general">General</a></h3>
<div class="sect3">
<h4 id="_2_space_indentations"><a class="anchor" href="#_2_space_indentations"></a><a class="link" href="#_2_space_indentations">2 space indentations</a></h4>
<div class="paragraph">
<p>Block contents should be indented with 2 spaces.</p>
</div>
</div>
<div class="sect3">
<h4 id="_120_column_limit"><a class="anchor" href="#_120_column_limit"></a><a class="link" href="#_120_column_limit">120 column limit</a></h4>
<div class="paragraph">
<p>We follow a 120 column line-length limit, except for description strings in <code>variable</code> and <code>output</code> blocks, where single
line strings are preferred.</p>
</div>
</div>
<div class="sect3">
<h4 id="_block_labels_variables_and_outputs_should_be_snake_case"><a class="anchor" href="#_block_labels_variables_and_outputs_should_be_snake_case"></a><a class="link" href="#_block_labels_variables_and_outputs_should_be_snake_case">Block Labels, Variables, and Outputs should be snake case</a></h4>
<div class="paragraph">
<p>The label for blocks should be in snake case. E.g. <code>example_instance</code> , not <code>ExampleInstance</code> or <code>example-instance</code>.</p>
</div>
<div class="admonitionblock note">
<table>
<tr>
<td class="icon">
<div class="title">Note</div>
</td>
<td class="content">
Labels are the strings that follow block names. For example, in the following, <code>aws_instance</code> and <code>example_instance</code>
are labels for the <code>resource</code> block.
</td>
</tr>
</table>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-attribute">resource</span> <span class="hljs-string">&quot;aws_instance&quot;</span> <span class="hljs-string">&quot;example_instance&quot;</span> &#123;
  <span class="hljs-comment"># Omitted for brevity</span>
&#125;
</pre>
</div>
</div>
<div class="paragraph">
<p>This includes variables and outputs as well:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-keyword">variable</span> <span class="hljs-string">&quot;vpc_id&quot;</span> &#123;&#125;
output <span class="hljs-comment">&quot;instance_name&quot;</span> <span class="hljs-comment">&#123;&#125;</span></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_module_folder_conventions"><a class="anchor" href="#_module_folder_conventions"></a><a class="link" href="#_module_folder_conventions">Module folder conventions</a></h4>
<div class="paragraph">
<p>Each module repo should have the following 3 folders:</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>modules</code>: Terraform modules that are designed to be consumed by users. The intention is that users should pull the
modules in the <code>modules</code> folder in their terraform code using <code>module</code> blocks.</p>
</li>
<li>
<p><code>examples</code>: Folder that contains top level Terraform modules that provide an example of how to use the modules in the
<code>modules</code> folder. The <code>examples</code> folder often has subfolders <code>for-learning-and-testing</code> and <code>for-production</code> that contain
corresponding example code. See <a href="#testing">Testing: Terratest</a> for more info on how these examples should be organized.</p>
</li>
<li>
<p><code>test</code>: Terratest Go files for testing the code in the repo. See <a href="#testing">Testing: Terratest</a> for specific conventions around Terratest.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Additionally, each module in <code>modules</code> should be organized with the following files:</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>variables.tf</code>: All <code>variable</code> blocks should go in here and they specify the inputs.</p>
</li>
<li>
<p><code>outputs.tf</code>: All <code>output</code> blocks should go in here and they specify the outputs.</p>
</li>
<li>
<p><code>main.tf</code>: All other logic should be added here.</p>
</li>
<li>
<p><code>dependencies.tf</code> (optional): Any external references that are pulled in by a <code>data</code> source block should go in here.
This allows consumers of the module to quickly scan for what resources need to already exist to deploy the module.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Any nonstandard file structure should be called out in the README (e.g., if <code>main.tf</code> is split up into multiple smaller
terraform files).</p>
</div>
</div>
<div class="sect3">
<h4 id="_variables_tf_conventions"><a class="anchor" href="#_variables_tf_conventions"></a><a class="link" href="#_variables_tf_conventions"><code>variables.tf</code> conventions</a></h4>
<div class="paragraph">
<p>Each variable block should always define a <code>description</code> and <code>type</code>, even if it is of the <code>string</code> type (the default), in that order. E.g.:</p>
</div>
<div class="listingblock">
<div class="content">
<pre>variable <span class="hljs-string">&quot;example&quot;</span> &#123;
  description = <span class="hljs-string">&quot;This is an example&quot;</span>
  type        = <span class="hljs-built_in">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;example&quot;</span>  # NOTE: <span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> optional
&#125;</pre>
</div>
</div>
<div class="sect4">
<h5 id="_complex_types"><a class="anchor" href="#_complex_types"></a><a class="link" href="#_complex_types">Complex types</a></h5>
<div class="paragraph">
<p>Prefer concrete objects (<a href="https://www.terraform.io/docs/configuration/types.html#structural-types">object type</a>) over
free form maps. However, for particularly large objects it is useful to support optional attributes. This is currently
<a href="https://github.com/hashicorp/terraform/issues/22449">not supported in terraform</a>, so workaround by using <code>any</code> type.</p>
</div>
<div class="paragraph">
<p>When using <code>any</code> type, always use comments to describe the supported attributes.
<a href="https://github.com/gruntwork-io/module-security/blob/da69690/modules/kms-master-key/variables.tf#L10">Example</a>.</p>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_outputs_tf_conventions"><a class="anchor" href="#_outputs_tf_conventions"></a><a class="link" href="#_outputs_tf_conventions"><code>outputs.tf</code> conventions</a></h4>
<div class="paragraph">
<p>Each output block should always define a <code>description</code>, before the <code>value</code>:</p>
</div>
<div class="listingblock">
<div class="content">
<pre>output <span class="hljs-string">&quot;greeting&quot;</span> &#123;
  description <span class="hljs-operator">=</span> <span class="hljs-string">&quot;This is a greeting for everyone.&quot;</span>
  value       <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello world!&quot;</span>
&#125;</pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="main_tf_conventions"><a class="anchor" href="#main_tf_conventions"></a><a class="link" href="#main_tf_conventions"><code>main.tf</code> conventions</a></h4>
<div class="paragraph">
<p><code>main.tf</code> should (loosely) be organized by sections that correspond to components. There is no standard on grouping, but
as a rule of thumb each section should be focused on a specific component of the module. For example, an ECS service
module may consist of the following sections:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The ECS service resource, and any locals logic for setting up the attributes of the resource.</p>
</li>
<li>
<p>The ECS task definition resource, and any locals and template logic for setting up the attributes of the resource
(e.g. the container definition).</p>
</li>
<li>
<p>Any resources related to configuring ELBs to forward traffic to the ECS service (e.g., listeners and target groups).</p>
</li>
<li>
<p>Any resources related to configuring IAM permissions for the ECS service.</p>
</li>
<li>
<p>Any resources related to configuring network access (e.g., security group rules) for the ECS service.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>There is no standard on ordering the sections, but as a rule of thumb the following sections should be placed first, in order:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Version constraints for the module</p>
</li>
<li>
<p>Provider blocks, if needed.</p>
</li>
<li>
<p>The main component of the module (e.g., the <code>aws_ecs_service</code> resource for the ECS service module).</p>
</li>
<li>
<p>All other sections.</p>
</li>
<li>
<p>Any <code>data</code> blocks (at the bottom).</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_conditionals"><a class="anchor" href="#_conditionals"></a><a class="link" href="#_conditionals">Conditionals</a></h4>
<div class="paragraph">
<p>Use <code>()</code> to break up conditionals across multiple lines.</p>
</div>
<div class="paragraph">
<p>Examples:</p>
</div>
<div class="listingblock">
<div class="content">
<pre>locals &#123;
  elb_id = (
    <span class="hljs-keyword">var</span>.elb_already_exists
    ? <span class="hljs-keyword">var</span>.elb_id
    : <span class="hljs-keyword">module</span>.elb.elb_id
  )

excluded*child_account_ids = (
<span class="hljs-keyword">var</span>.config_create_account_rules
? []
: [
<span class="hljs-keyword">for</span> account_name, account in <span class="hljs-keyword">module</span>.organization.child_accounts
: account.id <span class="hljs-keyword">if</span> <span class="hljs-title function*">lookup</span><span class="hljs-params">(lookup(<span class="hljs-keyword">var</span>.child_accounts, account_name, &#123;&#125;)</span>, <span class="hljs-string">&quot;enable_config_rules&quot;</span>, <span class="hljs-literal">false</span>) == <span class="hljs-literal">false</span>
]
)
&#125;

</pre>
</div>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_comments"><a class="anchor" href="#_comments"></a><a class="link" href="#_comments">Comments</a></h3>
<div class="paragraph">
<p>This section lists the Gruntwork conventions around comments in Terraform code.</p>
</div>
<div class="sect3">
<h4 id="_over"><a class="anchor" href="#_over"></a><a class="link" href="#_over"># over //</a></h4>
<div class="paragraph">
<p>Use <code>#</code> for comment strings, not <code>//</code> or <code>/**/</code>.</p>
</div>
</div>
<div class="sect3">
<h4 id="_over_2"><a class="anchor" href="#_over_2"></a><a class="link" href="#_over_2"># - over # ~</a></h4>
<div class="paragraph">
<p>Delimit section header comment blocks with <code># ----</code> instead of <code># ~~~~</code>.</p>
</div>
</div>
<div class="sect3">
<h4 id="_variables_tf"><a class="anchor" href="#_variables_tf"></a><a class="link" href="#_variables_tf"><code>variables.tf</code></a></h4>
<div class="paragraph">
<p><code>variables.tf</code> files should clearly indicate required environment variables, and separate out required variables from
optional variables (with defaults) using block comments.</p>
</div>
<div class="paragraph">
<p>Example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>
<span class="hljs-comment"># ENVIRONMENT VARIABLES</span>
<span class="hljs-comment"># Define these secrets as environment variables</span>
<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>

<span class="hljs-comment"># TF_VAR_master_password</span>

<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>
<span class="hljs-comment"># MODULE PARAMETERS</span>
<span class="hljs-comment"># These variables are expected to be passed in by the operator</span>
<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>

variable <span class="hljs-string">&quot;required_var&quot;</span> &#123;
<span class="hljs-attr">description</span> = <span class="hljs-string">&quot;This variable must be set in order to create the resource.&quot;</span>
<span class="hljs-attr">type</span> = string
&#125;

<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>
<span class="hljs-comment"># OPTIONAL PARAMETERS</span>
<span class="hljs-comment"># These variables have defaults and may be overridden</span>
<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>

variable <span class="hljs-string">&quot;optional_var&quot;</span> &#123;
<span class="hljs-attr">description</span> = <span class="hljs-string">&quot;This variable has a sensible default so it is not necessary to set it explicitly for this module to work.&quot;</span>
<span class="hljs-attr">type</span> = string
<span class="hljs-attr">default</span> = <span class="hljs-string">&quot;Hello world&quot;</span>
&#125;</pre>

</div>
</div>
</div>
<div class="sect3">
<h4 id="_main_tf"><a class="anchor" href="#_main_tf"></a><a class="link" href="#_main_tf"><code>main.tf</code></a></h4>
<div class="sect4">
<h5 id="_section_comments"><a class="anchor" href="#_section_comments"></a><a class="link" href="#_section_comments">Section comments</a></h5>
<div class="paragraph">
<p>Each section (as described in <a href="#main_tf_conventions"><code>main.tf</code> conventions</a>) of <code>main.tf</code> should have block comments describing the component
managed in the section.</p>
</div>
<div class="paragraph">
<p>Example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span>
<span class="hljs-comment"># ONE LINE SUMMARY DESCRIBING WHAT IS BEING MANAGED IN THIS SECTION IN ALL CAPS</span>
<span class="hljs-comment"># The rest of the comments should be in standard casing. This section should contain an overall description of the</span>
<span class="hljs-comment"># component that is being managed, and highlight any unconventional workarounds or configurations that are in place.</span>
<span class="hljs-comment"># ---------------------------------------------------------------------------------------------------------------------</span></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect2">
<h3 id="testing"><a class="anchor" href="#testing"></a><a class="link" href="#testing">Testing: Terratest</a></h3>
<div class="paragraph">
<p>Gruntwork uses <a href="https://terratest.gruntwork.io">Terratest</a> to write tests for Terraform modules. Terratest is a Go
library that provides patterns and helper functions for testing infrastructure code.</p>
</div>
<div class="sect3">
<h4 id="_terratest_best_practices"><a class="anchor" href="#_terratest_best_practices"></a><a class="link" href="#_terratest_best_practices">Terratest best practices</a></h4>
<div class="paragraph">
<p>Follow all the best practices listed in <a href="https://terratest.gruntwork.io/docs/#testing-best-practices">Terratest best practices</a>.</p>
</div>
<div class="paragraph">
<p>The rest of the items below are additional conventions on top of the documented best practices that Gruntwork follows
when writing tests using Terratest for terraform modules.</p>
</div>
</div>
<div class="sect3">
<h4 id="_code_formatting"><a class="anchor" href="#_code_formatting"></a><a class="link" href="#_code_formatting">Code formatting</a></h4>
<div class="paragraph">
<p>Terratest is a Go library, so each test will be written in Go. All Go source files should be formatted using <code>goimports</code>
and <code>go fmt</code>.</p>
</div>
</div>
<div class="sect3">
<h4 id="_examples_and_tests"><a class="anchor" href="#_examples_and_tests"></a><a class="link" href="#_examples_and_tests"><code>examples</code> and <code>tests</code></a></h4>
<div class="paragraph">
<p>In many cases the individual modules in the <code>modules</code> folder are narrowly focused to a specific subset of the overall
infrastructure. This means that in many cases you will need to provide dependent resources externally to the module in
order to actually deploy them. The Terraform modules in the <code>examples</code> folder serves this purpose, specifying test
resources that are injected as dependencies to the modules.</p>
</div>
<div class="paragraph">
<p>As such, the tests should be written against the <code>examples</code> folder, as opposed to the <code>modules</code> folder directly. In
other words:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Every module in <code>modules</code> should have a corresponding example module in <code>examples</code> that calls it. (NOTE: you can have
a single example call multiple modules).</p>
</li>
<li>
<p>Every example should have at least one test that calls it.</p>
</li>
<li>
<p>Tests should not directly call modules in the <code>modules</code> folder. Always go through the <code>examples</code>.</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_parallel"><a class="anchor" href="#_parallel"></a><a class="link" href="#_parallel">Parallel</a></h4>
<div class="paragraph">
<p>Every test should have the <code>t.Parallel</code> call in the test function unless there is a specific need to run tests serially,
e.g. manipulating process global resources, like environment variables. This is so that tests run as quickly as possible.</p>
</div>
<div class="paragraph">
<p>To facilitate this, every reference to a terraform example should use
<a href="https://pkg.go.dev/github.com/gruntwork-io/terratest/modules/test-structure#CopyTerraformFolderToTemp">test_structure.CopyTerraformFolderToTemp</a>
to create a copy of the example module in a temp directory. Then as the test runs, any stateful changes to the example
module directory are isolated across tests, so that there&#8217;s no conflict on parallel runs.</p>
</div>
</div>
<div class="sect3">
<h4 id="_use_teststages_for_faster_development"><a class="anchor" href="#_use_teststages_for_faster_development"></a><a class="link" href="#_use_teststages_for_faster_development">Use TestStages for faster development</a></h4>
<div class="paragraph">
<p>Use <a href="https://terratest.gruntwork.io/docs/testing-best-practices/iterating-locally-using-test-stages/">test stages</a>
in the test code, unless you only have 1 or 2 steps in the test code (e.g. a <code>plan</code> verification test).</p>
</div>
<div class="paragraph">
<p>It&#8217;s very tedious to build and deploy resources over and over when you only want to tweak a validation step. TestStages
make it flexible and convenient to skip stages, making development much faster.</p>
</div>
<div class="paragraph">
<p>For each test stage you introduce, add a commented out series of <code>os.Setenv</code> calls to make it convenient to skip stages
as you develop.</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">TestJenkins</span><span class="hljs-params">(t *testing.T)</span></span> &#123;
	t.Parallel()

    <span class="hljs-comment">// Uncomment the items below to skip certain parts of the test</span>
    <span class="hljs-comment">//os.Setenv(&quot;SKIP_build_ami&quot;, &quot;true&quot;)</span>
    <span class="hljs-comment">//os.Setenv(&quot;SKIP_deploy_terraform&quot;, &quot;true&quot;)</span>
    <span class="hljs-comment">//os.Setenv(&quot;SKIP_validate&quot;, &quot;true&quot;)</span>
    <span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup&quot;, &quot;true&quot;)</span>
    <span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup_ami&quot;, &quot;true&quot;)</span>

    <span class="hljs-keyword">defer</span> test_structure.RunTestStage(t, <span class="hljs-string">&quot;cleanup_ami&quot;</span>, deleteAMI)
    <span class="hljs-keyword">defer</span> test_structure.RunTestStage(t, <span class="hljs-string">&quot;cleanup&quot;</span>, destroyInfra)
    test_structure.RunTestStage(t, <span class="hljs-string">&quot;build_ami&quot;</span>, buildAMI)
    test_structure.RunTestStage(t, <span class="hljs-string">&quot;deploy_terraform&quot;</span>, deployInfra)
    test_structure.RunTestStage(t, <span class="hljs-string">&quot;validate&quot;</span>, validateInfra)

&#125;

</pre>

</div>
</div>
<div class="paragraph">
<p>To use the stages, here&#8217;s an example workflow. The first time you run the test, you&#8217;ll want to skip only the <code>cleanup</code>
stages:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment">// Uncomment the items below to skip certain parts of the test</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_build_ami&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_deploy_terraform&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_validate&quot;, &quot;true&quot;)</span>
os.Setenv(<span class="hljs-string">&quot;SKIP_cleanup&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
os.Setenv(<span class="hljs-string">&quot;SKIP_cleanup_ami&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)</pre>
</div>
</div>
<div class="paragraph">
<p>Let&#8217;s say building and deploying were successful, but validation failed. Since resources were not cleaned up, we can run
only the <code>validate</code> stage. We skip the resource and time intensive <code>build</code> and <code>deploy</code> stages, and also continue to
skip the <code>cleanup</code> stages.:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment">// Uncomment the items below to skip certain parts of the test</span>
os.Setenv(<span class="hljs-string">&quot;SKIP_build_ami&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
os.Setenv(<span class="hljs-string">&quot;SKIP_deploy_terraform&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<span class="hljs-comment">//os.Setenv(&quot;SKIP_validate&quot;, &quot;true&quot;)</span>
os.Setenv(<span class="hljs-string">&quot;SKIP_cleanup&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
os.Setenv(<span class="hljs-string">&quot;SKIP_cleanup_ami&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)</pre>
</div>
</div>
<div class="paragraph">
<p>Once you&#8217;ve established that validation works, you can then run only the <code>cleanup</code> stages as below. Your workflow may vary.</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment">// Uncomment the items below to skip certain parts of the test</span>
os.Setenv(<span class="hljs-string">&quot;SKIP_build_ami&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
os.Setenv(<span class="hljs-string">&quot;SKIP_deploy_terraform&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
os.Setenv(<span class="hljs-string">&quot;SKIP_validate&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup_ami&quot;, &quot;true&quot;)</span></pre>
</div>
</div>
<div class="paragraph">
<p>When committing the final version of the test, all should be commented out so all stages run.</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-comment">// Uncomment the items below to skip certain parts of the test</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_build_ami&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_deploy_terraform&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_validate&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup&quot;, &quot;true&quot;)</span>
<span class="hljs-comment">//os.Setenv(&quot;SKIP_cleanup_ami&quot;, &quot;true&quot;)</span></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_setup_and_teardown_pattern"><a class="anchor" href="#_setup_and_teardown_pattern"></a><a class="link" href="#_setup_and_teardown_pattern">Setup and Teardown pattern</a></h4>
<div class="paragraph">
<p>In some cases you will want to write a group of tests that use a common resource, such as a Docker image or VPC. In this
case, you will want to setup the common resource once, run a bunch of tests, and then teardown the resource. To achieve
this, you can follow <a href="https://blog.golang.org/subtests">the subtest pattern</a> of Go.</p>
</div>
<div class="paragraph">
<p>Use <a href="https://dave.cheney.net/2019/05/07/prefer-table-driven-tests">table driven tests</a> where possible to make
the subtest routines maintainable. Briefly, this means that you group your test cases using a test struct that reflects
the unique parameters of the test cases. Then you can conveniently loop over the test cases in parallel, taking
advantage of uniformity and speed.</p>
</div>
<div class="paragraph">
<p>Note that the subtest pattern has gotchas when running tests in parallel:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The main test function will not wait for the subtest to run if it uses <code>t.Parallel</code>. To avoid this, you need to wrap
the parallel subtests in a synchronous, blocking subtest. In the example below, the <code>group</code> subtest is synchronous (no
call to <code>t.Parallel</code>) and thus the main function will wait until that test finishes. The <code>group</code> test does not finish
until all the subtests it spawns are finished, even if they are non-blocking and parallel, and thus the <code>tearDownVPC</code>
call does not happen until all subtests are done.</p>
</li>
<li>
<p>If you are using table driven tests, the range variable will be updated to the next iteration before it is used within
the subtest. That is, in the example below, if we did not have the <code>testCase := testCase</code> line in the range block, the
<code>testCase</code> reference used in the subtest after the <code>t.Parallel</code> call will correspond to the last <code>testCase</code> in the
<code>testCases</code> list. To avoid this, we create a new variable in the scope of the range block so that it does not get
updated during the loop.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">TestECS</span><span class="hljs-params">(t *testing.T)</span></span> &#123;
    t.Parallel()

    <span class="hljs-keyword">defer</span> tearDownVPC()
    deployVPC()

    <span class="hljs-comment">// Wrap the parallel tests in a synchronous test group to ensure that the main test function (the one calling</span>
    <span class="hljs-comment">// `tearDownVPC` and `deployVPC`) waits until all the subtests are done before running the deferred function.</span>
    t.Run(<span class="hljs-string">&quot;group&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(t *testing.T)</span></span> &#123;
        <span class="hljs-keyword">for</span> _, testCase := <span class="hljs-keyword">range</span> testCases &#123;
            <span class="hljs-comment">// To avoid the range variable from getting updated in the parallel tests, we bind a new name that is within</span>
            <span class="hljs-comment">// the scope of the for block.</span>
            testCase := testCase
            t.Run(testCase.name, <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(t *testing.T)</span></span> &#123;
                t.Parallel()
                testCase.testCode()
            &#125;)
        &#125;
    &#125;)

&#125;

</pre>

</div>
</div>
</div>
</div>
</div>
</div>