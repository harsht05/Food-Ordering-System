package com.project.Quisine;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.repository.UserEntityRepository;
import com.project.Quisine.service.UserEntityService;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserEntityRepository userRepository;

    @InjectMocks
    private UserEntityService userService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    void testAddUser() {
        // Create a user entity to be added
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName("testUser");
        userEntity.setUserEmail("test@example.com");
        userEntity.setUserPass("password");

        // Mock the behavior of password encoder
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        // Mock the behavior of userRepository.save() method
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
            UserEntity user = invocation.getArgument(0);
            user.setUserId(1); // Set some dummy user id for testing
            return user;
        });

        // Call the addUser method
        UserEntity savedUser = userService.addUser(userEntity);

        // Verify that userRepository.save() method was called with correct arguments
        verify(userRepository).save(userEntity);

        // Verify that password encoder was called with correct argument
        verify(passwordEncoder).encode("password");

        // Assert the returned user entity
        assertEquals(1, savedUser.getUserId()); // Assuming user id is set to 1
        assertEquals("testUser", savedUser.getUserName());
        assertEquals("test@example.com", savedUser.getUserEmail());
        assertEquals("encodedPassword", savedUser.getUserPass()); // Assuming password was encoded as expected
    }
}
