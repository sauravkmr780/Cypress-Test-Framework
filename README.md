<main.yml> -- Information
Starting from a top, we’re defining GitHub Actions workflow’s name and under which conditions it will be triggered. 
I’ve chosen to trigger it after pushing new commit into the main branch.

Next, there is a jobs section, with only one job defines — cypress-run

Above we define the name of a workflow, which host runner will be used and finally  workflow will be running .

Then we can move on to the steps of a workflow.
First we need to set up a job, by checking out the code from the main branch and then downloading and installing all necessary dependencies for running tests.

After that we can run our tests in a Firefox browser. There is here the continue-on-error flag set to true because even if our tests fail we want to run other workflow steps responsible for generating a report.
