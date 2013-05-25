task :default => [:generate]

task :generate => :clear do
  sh 'jekyll'
end

task :clear do
  sh 'rm -rf ./_site/*'
end
