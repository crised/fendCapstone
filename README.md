# Capstone project

## Overview
This project shows most of the concepts I've learn
It has an additional feature that calculates
the duration of the trip.

## Front end
It uses Webpack, sass, and babel among other projects.
It's basically making a post request, then
updating the UI with the information responded.

## Back end

This is where things are interesting. 
We're contacting 3 APIs in a serial manner.
To achieve this functionality we use 
a 3 step Promise chain. Only on the last Promise
we send the response back to the client. 

## Extras
It uses Jest for testing. 