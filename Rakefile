task :default => [:generate]

task :generate => :clear do
  sh 'jekyll serve'
end

task :clear do
  sh 'rm -rf ./_site/*'
end
