class PagesController < ApplicationController
  #static pages are SPA's with angular, and therefore should not have the same layout
  layout "angular"
end