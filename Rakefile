task :default => [:generate]

task :generate => :clear do
  sh 'jekyll'
end

task :clear do
  sh 'rm -rf ./_site/*'
end

task :deploy do
  sh 'rsync -auh --size-only --progress --stats --delete ./_site/ rjshade.com:/home/public/'
end

