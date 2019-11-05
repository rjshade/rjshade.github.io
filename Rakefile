task :default => [:generate]

task :generate => :clear do
  sh 'bundle exec jekyll serve'
end

task :clear do
  sh 'rm -rf ./_site/*'
end
