# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'form_validation_js/version'

Gem::Specification.new do |spec|
  spec.name          = "form_validation_js"
  spec.version       = FormValidationJs::VERSION
  spec.authors       = ["sanket-redkar"]
  spec.email         = ["sanket.redkar20@gmail.com"]
  spec.summary       = %q{Form Validation }
  spec.description   = %q{ This gem validated the form based on  class applied on the fields  }
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = Dir["{lib,vendor}/**/*"] + ["MIT-LICENSE", "README.md"]
  #`git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.5"
  spec.add_development_dependency "rake"
end
