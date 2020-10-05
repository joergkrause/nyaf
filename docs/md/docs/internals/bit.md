# Bit for **ny@f**

This document explains how to write **ny@f** components and publish to the [Bit](https://bit.dev) repository. This text is based on the similar strategy used by **ny@f**.

## Overview

Bit lets you share and sync components between different projects and applications. In this tutorial, we'll share a **ny@f** component between two projects.

## Prior Knowledge

This tutorial assumes that you are familiar with:

* Terminal and command line.
* Using node and npm or yarn.
* Web component development using **ny@f**
* Git

## What Do You Need?

You need to verify that you have:

* Node 8.12+ (Node 12 LTS recommended)

To run this tutorial, clone and setup the **ny@f** tutorial project: https://github.com/joergkrause/bit-nyaf-tutorial

~~~
git clone https://github.com/joergkrause/bit-nyaf-tutorial
cd bit-**ny@f**-tutorial
npm i
~~~

### What Will You Learn?

In this tutorial you will learn how to:

* Setup Bit
* Share a **ny@f** component from an existing project
* Preview the exported component on the Bit cloud
* Install the component in another project
* Modify the **ny@f** component on the new project
* Get component updates

## Setup Bit

First things first, we need to setup Bit.

Create a Free bit.dev Account
Head over to bit.dev and create your free account. Enter a username and password or use your GitHub account to authenticate. Welcome to Bit! Make sure that you remember your username; you'll need it during this tutorial. Every time you see <username>, replace it with your own username.

Create a Component Collection
When you are logged into bit.dev you can create a collection. A collection is a remotely-hosted set of components that are ready to be shared and used across your applications.

Click the New button in the header and choose Collection.
Name the new collection **ny@f**-tutorial (or choose a different name, as long as you remember it).
Decide if the collection is private or public.
Public - Components in public collections are visible to everyone.
Private - Components in private collections are available to invitees only.
Install Bit CLI
Install Bit CLI on your computer using npm:

npm install bit-bin -g

Copy
Visit Install Bit for other installation methods.

If you have Bit installed, verify the installation by running the command:

bit --version

Copy
Login to Your Bit Account
Authenticate Bit to your bit.dev account. From the command-line run:

bit login

Copy
This will open your browser where you can log into your account. If you are already logged in, a success message will be displayed. You are now ready to start using Bit.

As part of the login process, Bit sets up your local configuration. You can see your configuration by typing:

bit config

Copy
In addition, Bit adds the npm registry used by Bit to your npmrc configuration. (by default located in $HOME/.npmrc according to your OS).

Initialize Bit Workspace
Switch to the **ny@f** tutorial project directory and run the Bit initialization command using yarn:

$ bit init --package-manager yarn
successfully initialized a bit workspace.

Copy
We are going to use create-**ny@f**-app, so it is recommended to use yarn. If you do not have Yarn installed, you can safely use npm.

Now two other changes happen:

A new file named .bitmap has been created in your root directory. This file tracks Bit components and only includes a comment and a line with your bit version.

A new section, bit, has been added to your package.json file with the following defaults for your project:

{
  "bit": {
    "env": {},
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "yarn"
  }
}


Copy
In an actual project, these changes should be committed to your version control tool system.

Share a **ny@f** Component
Now, we will track the product-list component from the **ny@f** tutorial project. The component will be tracked with the id product-list.

Track a New Component
To track the product list component, we will need to tell Bit about the component and the files that are related to it. As all the files are located under the product-list directory, the simplest way is to add all the files in the directory to your component. Bit will create a component named after the directory name.

$ bit add src/components/product-list
tracking component product-list:
added src/components/product-list/index.js
added src/components/product-list/product-list.css
added src/components/product-list/products.js

Copy
When creating new components, you need to make sure that you have properly added all of the files required for the component. Bit can analyze the component for you and verify that all files are included. You can do that by checking the status of the component:

$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > product-list ... ok

Copy
We also added the products.js file that contains product data. In this demo application, it is acceptable as the file is used only by the product-list component. In other cases, however, if this file were used by multiple components you may want to consider creating the products.js file as a separate component that will become a dependency of the product-list and other components.

Install **ny@f** Compiler
So far, we have provided Bit with the source file of the component. But in order to consume the files in other projects, the component needs to be built.

Bit is storing the source code of the component, but the code should still remain in your version control system (VCS) such as your Git repository.

Bit has a large collection of compilers that are open source and maintained by the Bit team. In addition, the community has created compilers that you can use by searching Bit collections.

For building the **ny@f** component, you'll need the **ny@f** compiler.
Install the compiler and run this command inside the **ny@f** tutorial repository:

$ bit import bit.envs/compilers/**ny@f** --compiler
the following component environments were installed
- bit.envs/**ny@f**@0.1.3

Copy
The version may slightly vary when you run the tutorial

The **ny@f** compiler is now set as the default compiler for the Bit workspace inside this repository. You can check the package.json and verify that the compiler is installed by locating the following entry in the Bit section:

{
  "env": {
    "compiler": "bit.envs/compilers/**ny@f**@1.0.2"
  },
}

Copy
Build the **ny@f** Component
Now that the compiler is installed, build the component. Building the component serves two purposes:

Make the component directly consumable by other projects.
Make sure that the component is all-inclusive and contains all the parts that are required in order to share it with others.
Right now the component lives inside your project and may consume some dependencies from your project. Bit build is taking place in an isolated environment to make sure the process will also succeed on the cloud or in any other project. To build your component, run this command inside your **ny@f** project:

bit build

Copy
This results in the component name (product-list) followed by a list of file names. Those are the built files of the component.

Export Component
With the component properly built, it is now time to share it with the world.
Components are versioned according to SemVer standards. To tag your component with a version, run the following command:

$ bit tag --all 0.0.1
1 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

new components
(first version for components)
     > product-list@0.0.1

Copy
This command tags all the components that are currently staged in Bit. In our case, it's only the product-list component.

You can check the component status (bit status) and you'll find the following:

$ bit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > product-list. versions: 0.0.1 ... ok

Copy
The important thing to notice here is that the component is considered staged. That means that it is now ready to be exported.

To export the component to your bit.dev collection, we will use the export command and the full name of the collection, structured as <username>.<collection>:

$ bit export <username>.**ny@f**-tutorial
exported 1 components to scope <username>.**ny@f**-tutorial

Copy
The component is now visible in your collection on bit.dev. You can access it in https://bit.dev/<username>/**ny@f**-tutorial. You can also visit the component created for this demo on: https://bit.dev/learn-bit/**ny@f**-tutorial

At this point, checking bit's status will no longer display the component as the component is now hosted on the remote collection:

$ bit status
nothing to tag or export

Copy
If you want to see all the components you have you can run:

bit list

Copy
You will get a list of all components and their versions.

Right now, the component code is in your local project (and should be committed to your source control), but it is also available for other projects.

Preview the **ny@f** Component
The **ny@f** component is also available on the bit.dev cloud. Go to https://bit.dev and log into your account (if you are not logged in yet):

Select the collections navigator on the left panel and select collections.
Click on your collection--you׳ll see your product-list component.
Click on the product-list component to see its playground.
You can also access the page at the following url: https://bit.dev/<username>/**ny@f**-tutorial/product-list

The component playground provides you with a basic **ny@f** app that already has your components.

You can improve it a bit by adding a new file named styles.css with the following style:

#anchor {
  flex-direction: column;
}

Copy
Import styles.css into the index.js file in the playground:

import './styles.css';

Copy
Save the example

In few seconds you will see the component rendered in the playground. You can view an example here.

On the component's page, you can also see the different commands available for installing this component using yarn or npm. You can copy the yarn command; we are going to use it very soon.

Install Component in Another Project
Create a New **ny@f** Application
You are now going to create another **ny@f** application and use the product-list component. The fastest way to do that is to use the **ny@f** CLI to generate a new Application. Switch to a new directory.

npx create-**ny@f**-app my-new-app

Copy
In your terminal, switch to the my-new-app directory.

Install the Component in Your Project
Use your favorite package installer (yarn is preferred) to install the component.
The component is stored in the Bit registry, so the full path to the component will be: @bit/<username>.<collection name>.<component name>

Run the install command using yarn:

yarn add @bit/<username>.**ny@f**-tutorial.product-list --save

Copy
If you want to use npm, run npm install once after the project is created so a package-lock.json will be created and npm will organize dependencies correctly.

The component is now added to your package.json:

"@bit/<username>.**ny@f**-tutorial.product-list": "0.0.1"

Copy
Use In Your Application
Now you can use the component in your code, just like any other import. Add it as a module to the top level app module and use it on the app page. We will make the same changes in the code as we did on the playground in the application:

// App.js
import ProductList from '@bit/<username>.**ny@f**-tutorial.product-list';
function App() {
  return (
    <div className="App">
      <ProductList/>
    </div>
  );
}

Copy
Update the css file:

.App {
  flex-direction: column;
  margin: 20px;
}

Copy
Last but not least, run your application using **ny@f** CLI:

yarn start

Copy
Voila! You can now see the components list inside the newly created application.

Modify the Component
Next, we are going to make a change to the component and export it back to the collection. We will add a View button to the product list. For simplicity, it will only show an alert saying the product has been viewed.

Import the Component
Up until now, the product-list component was only installed (in its built form) in our project. Now, we want to import the code into our project to make the changes.

In order to import the component, initiate the my-new-app workspace as a Bit workspace:

bit init

Copy
After the confirmation message that the workspace was initialized, run the following command:

$ bit import <username>.**ny@f**-tutorial/product-list
successfully imported one component
- added <username>.**ny@f**-tutorial/product-list new versions: 0.0.1, currently used version 0.0.1

Copy
Notifications on missing core dependencies are ok. You should already have those packages in your project.

The command is also available on the component page.

You get a message that the @**ny@f**/core and @**ny@f**/common are peer dependencies. This is ok, as your my-new-app project already contains them.

Here is what happened:

A new top-level components folder is created that includes the code of the component, with its compiled code and node_modules (in this case the node_modules are empty, as all of your node_modules are peer dependencies and are taken from the root project).
The .bitmap file was modified to include the reference to the component
The package.json file is modified to point to the files rather than the remote package. Your package.json now displays:
{
  "@bit/<username>.**ny@f**-tutorial.product-list": "file:./components/product-list"
}

Copy
Start your application to make sure it still works. As you'll see, no changes are required: Bit takes care of everything.

Update the Code
Let's modify the product-list component. Change the components/product-list/index.js to include the following method:

view() {
    window.alert('The product has been viewed!');
 }

Copy
Change the getProduct function in components/product-list/index.js to include the new button:

getProduct(product, index) {
        return (
            <div key={index}>
                <h3>
                    <a title={product.name + ' details'} href="/">{product.name}</a>
                </h3>
                <p>Description: {product.description} </p>
                <button className="btn" onClick={this.share}>Share</button>
                <button className="btn" onClick={this.view}>View</button>

            </div>
        )
    }

Copy
Change the css file components/product-list/product-list.css to include a margin on the .btn:

  margin: 4px;

Copy
Run the **ny@f** application:

yarn start

Copy
The app is not yet changed. That's because the Bit components are compiled by the bit compiler. In a separate terminal, run the bit build command to compile the changes. You should see that the compiler is installed:

successfully installed the bit.envs/compilers/**ny@f**@0.1.3 compiler

Copy
That will be followed by a successful compilation of all of the files.

Run the my-new-app again and you'll now see the changed component with the view button.

In a real project, it is recommended to commit those changes to your GitHub repository.

Export the Changes
Next, export the changes done to the component back to bit.dev.

bit status

Copy
The product-list component was modified:

modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > product-list ... ok

Copy
Tag and export the component as a new version. By default this is a SemVer patch version:

$ bit tag product-list
1 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > <username>.**ny@f**-tutorial/product-list@0.0.2

Copy
Export it back to the collection:

$ bit export <username>.**ny@f**-tutorial
exported 1 components to scope <username>.**ny@f**-tutorial

Copy
Head to the component page on bit.dev. Here you can see that the component has a new version. The changes are also visible on the component playground. You can see an example here

Get Component Updates
In this last stage, you'll import the changes to the original project. Switch back to **ny@f**-tutorial.

Import Changes
Run bit import to see if any components were changed (similar to doing git pull to check git changes).

We will see that the product-list component was changed and a new version exists:

$ bit import
successfully imported one component
- updated <username>.**ny@f**-tutorial/product-list new versions: 0.0.2

Copy
The component is downloaded but is not yet changed. Check the workspace status, you will get the following:

$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit diff [component_id] [new_version]" to compare changes)
(use "bit log [component_id]" to list all available versions)

    > <username>.**ny@f**-tutorial/product-list current: 0.0.1 latest: 0.0.2

Copy
Checkout
Merge the changes done to the component to your project. The structure of the command is bit checkout <version> <component>. So you run:

$ bit checkout 0.0.2 product-list
successfully switched <username>.**ny@f**-tutorial/product-list to version 0.0.2
updated src/app/product-list/product-list.component.css
updated src/app/product-list/product-list.component.html
updated src/app/product-list/product-list.component.ts
updated src/app/product-list/product-list.module.ts
updated src/app/product-list/products.ts

Copy
Bit performs a git merge. The code from the updated component is now merged into your code.

Run the application again to see it is working properly with the updated component:

yarn start

Copy
That's it. A change was moved between the two projects. Your application is running with an updated component.

Happy coding!