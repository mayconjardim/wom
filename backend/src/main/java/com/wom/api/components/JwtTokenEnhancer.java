package com.wom.api.components;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.wom.api.entities.Role;
import com.wom.api.entities.User;
import com.wom.api.repositories.UserRepository;

@Component
public class JwtTokenEnhancer implements TokenEnhancer {

	@Autowired
	private UserRepository userRepository;

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		User user = userRepository.findByEmail(authentication.getName());

		Map<String, Object> map = new HashMap<>();
		map.put("userName", user.getName());
		map.put("userId", user.getId());

		String role = "";
		boolean isAdmin = false;

		for (Role auth : user.getRoles()) {

			if (auth.getAuthority().contains("ROLE_MANAGER")) {
				role = "Manager";
			}

			if (auth.getAuthority().contains("ROLE_YARD")) {
				role = "Yard";
			}

			if (auth.getAuthority().contains("ROLE_ADMIN")) {
				isAdmin = true;
			}

		}

		map.put("role", role);
		map.put("admin", isAdmin);

		DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) accessToken;
		token.setAdditionalInformation(map);

		return accessToken;
	}

}