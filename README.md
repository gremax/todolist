# Todolist

[![Build Status](https://travis-ci.org/gremax/todolist.svg?branch=master)](https://travis-ci.org/gremax/todolist) [![Code Climate](https://codeclimate.com/github/gremax/todolist/badges/gpa.svg)](https://codeclimate.com/github/gremax/todolist) [![Test Coverage](https://codeclimate.com/github/gremax/todolist/badges/coverage.svg)](https://codeclimate.com/github/gremax/todolist/coverage)

This is a simple Task manager. [Demo](http://todolist-on-rails.herokuapp.com)

## Functional requirements
- I want to be able to sign in/sign up by email/password or Facebook
- I want to be able to create/update/delete projects
- I want to be able to add tasks to my project
- I want to be able to update/delete tasks
- I want to be able to prioritise tasks into a project
- I want to be able to choose deadline for my task
- I want to be able to mark a task as 'done'
- I want to be able to add comments to my tasks
- I want to be able to delete comments
- I want to be able to attache files to comments

## Technical requirements
- It should be a WEB application
 - For the client side must be used: HTML5, CSS3, Twitter Bootstrap, JavaScript, AngularJS, jQuery.
 - For server side Ruby on Rails.
- It should have client side and server side validation.
- It should look like on screens (see attached file 'rg_test_task_grid.png').
- It should work like one page WEB application and should use AJAX technology, load and submit data without reloading a page.
- It should have user authentication solution and a user should only have access to their own projects and tasks (Devise, Cancancan).
- It should have automated tests for all functionality (models ­ RSpec, controllers ­ RSpec, acceptance/functional tests ­ RSpec + Capybara).

![rg_test_task_grid.png](https://raw.githubusercontent.com/gremax/todolist/master/spec/support/uploads/rg_test_task_grid.png)
